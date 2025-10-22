"use client";

import * as React from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function UpgradeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Upload (Basic deaktiviert)</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>RSI Pro freischalten</DialogTitle>
          <DialogDescription>
            Datei-Uploads sind im Basic-Plan deaktiviert. Mit <b>RSI Pro</b> erhältst du:
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Dokumenten-Upload & erweiterte Analyse</li>
              <li>Quellen-Transparenz & ausführlicher PDF-Export</li>
              <li>Pro-Analysemodi (RAG mit Weaviate)</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3">
          <Button variant="ghost">Später</Button>
          <Button>Jetzt upgraden</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
