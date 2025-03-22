"use client";

import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog";
import { Input } from "../../../@/components/ui/input";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import axios from "axios";
import { toast } from "sonner";

function UploadPdfDialog({ children,isMaxfile }) {
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const insertFileEntry = useMutation(api.messages.AddfileEntryToDb);
  const getFileUrl = useMutation(api.messages.getFileUrl);
  const embeddDocument = useAction(api.myActions.ingest);
  const { user } = useUser();

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Generate Upload URL
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();

      // Step 2: Get File URL
      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId });
      console.log({ fileId, fileUrl });

      // Step 3: Insert File Entry into Database
      await insertFileEntry({
        fileId,
        storageId,
        fileName: fileName.trim() || "Untitled File",
        fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      // Step 4: Extract Text from PDF
      const res = await axios.get("/api/pdf-loader", { params: { pdfUrl: fileUrl } });
      console.log(res);

      // Step 5: Embed the Extracted Text
      const embedResult = await embeddDocument({
        splitText: res.data.result,
        fileId,
      });

      console.log("Embedding Result:", embedResult);

      // Close the dialog after successful upload
      setOpen(false);
      setFile(null);
      setFileName("");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
      toast('file is ready ')
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} disabled={isMaxfile}>+ Upload PDF files</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <div >
            <div className="mt-10">
              <div className="flex gap-2 p-3 rounded-md border">
                <span className="text-black">Select a file to upload</span>
                <input
                  className="border-2 border-black"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                />
              </div>
              <div className="mt-2">
                <label>File Name*</label>
                <Input
                  placeholder="File Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              className="hover:bg-gray-950 hover:text-white cursor-pointer"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;