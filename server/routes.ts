import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from 'resend';

// Integration: Resend for background notifications
async function getResendCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  const connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { 
    apiKey: connectionSettings.settings.api_key as string, 
    fromEmail: connectionSettings.settings.from_email as string 
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
        return;
      }
      throw err;
    }
  });

  app.post("/api/quiz-submission", async (req, res) => {
    try {
      const data = req.body;
      console.log("Quiz Submission Received:", data);
      
      // Background email notification using Resend
      try {
        const { apiKey, fromEmail } = await getResendCredentials();
        console.log(`Sending quiz notification from ${fromEmail} to ${fromEmail}`);
        const resend = new Resend(apiKey);
        
        await resend.emails.send({
          from: fromEmail,
          to: fromEmail, // Send to yourself
          subject: `New Quiz Lead: ${data.businessName || 'Unknown Business'}`,
          html: `
            <h1>New Lead from Quiz</h1>
            <p><strong>Business Name:</strong> ${data.businessName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Monthly Clients:</strong> ${data.monthlyClients}</p>
            <p><strong>Monthly Revenue:</strong> ${data.monthlyRevenue}</p>
            <p><strong>Business Type:</strong> ${data.businessType} ${data.otherBusinessType ? `(${data.otherBusinessType})` : ''}</p>
            <hr />
            <p>Sent via Houidi.com Quiz System</p>
          `
        });
        console.log("Notification email sent successfully");
      } catch (emailErr) {
        console.error("Failed to send notification email:", emailErr);
        // We don't fail the request if email fails, as user shouldn't notice
      }
      
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Quiz submission error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
