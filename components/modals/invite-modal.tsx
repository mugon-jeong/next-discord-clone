"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@radix-ui/react-menu";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();
  const router = useRouter();
  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`,
      );
      onOpen("invite", { server: response.data });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className={"bg-white text-black p-0 overflow-hidden"}>
        <DialogHeader className={"pt-8 px-6"}>
          <DialogTitle className={"text-2xl text-center font-bold"}>
            Customize your server
          </DialogTitle>
          <DialogDescription className={"text-center text-zinc-500"}>
            Give your server a personality with a name and an image. Tou can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <div className={"p-6"}>
          <Label
            className={
              "uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
            }
          >
            Server invte link
          </Label>
          <div className={"flex items-center mt-2 gap-x-2"}>
            <Input
              disabled={isLoading}
              className={
                "bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              }
              value={inviteUrl}
            />
            <Button disabled={isLoading} size={"icon"} onClick={onCopy}>
              {copied ? (
                <Check className={"w-4 h-4"} />
              ) : (
                <Copy className={"w-4 h-4"} />
              )}
            </Button>
          </div>
          <Button
            onClick={onNew}
            disabled={isLoading}
            variant={"link"}
            size={"sm"}
            className={"text-xs text-zinc-500 mt-4"}
          >
            Generate a new link
            <RefreshCw className={"w-4 h-4 ml-2"} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
