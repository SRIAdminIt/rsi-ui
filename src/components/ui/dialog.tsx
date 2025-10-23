import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type DialogContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
const DialogCtx = React.createContext<DialogContextType | null>(null);

export function Dialog(props: { open?: boolean; onOpenChange?: (v: boolean) => void; children?: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const controlled = typeof props.open === "boolean";
  const open = controlled ? !!props.open : internalOpen;

  const setOpen = (v: boolean) => {
    if (!controlled) setInternalOpen(v);
    props.onOpenChange?.(v);
  };

  return <DialogCtx.Provider value={{ open, setOpen }}>{props.children}</DialogCtx.Provider>;
}

export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  const ctx = React.useContext(DialogCtx)!;
  const child = React.isValidElement(children)
    ? React.cloneElement(children as any, {
        onClick: (e: any) => {
          (children as any).props?.onClick?.(e);
          ctx.setOpen(true);
        },
      })
    : children;

  if (asChild) return <>{child}</>;
  return (
    <button className="inline-flex items-center rounded-2xl px-4 py-2" onClick={() => ctx.setOpen(true)}>
      {children}
    </button>
  );
}

function Portal({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") return null;
  const mount = document.body;
  return createPortal(children, mount);
}

export function DialogContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(DialogCtx)!;
  if (!ctx.open) return null;

  const onBackdrop = () => ctx.setOpen(false);

  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
      >
        <div className="fixed inset-0 bg-black/40" onClick={onBackdrop} />
        <div
          className={cn(
            "relative z-10 w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl",
            className
          )}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-2", className)} {...props} />;
}
export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-xl font-semibold", className)} {...props} />;
}
export function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-neutral-600", className)} {...props} />;
}
export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4 flex justify-end gap-2", className)} {...props} />;
}

export function DialogClose({
  asChild,
  children,
}: {
  asChild?: boolean;
  children?: React.ReactNode;
}) {
  const ctx = React.useContext(DialogCtx)!;
  const child = React.isValidElement(children)
    ? React.cloneElement(children as any, {
        onClick: (e: any) => {
          (children as any).props?.onClick?.(e);
          ctx.setOpen(false);
        },
      })
    : null;

  if (asChild && child) return <>{child}</>;
  return (
    <button
      className="inline-flex items-center rounded-2xl px-4 py-2"
      onClick={() => ctx.setOpen(false)}
    >
      {children ?? "Close"}
    </button>
  );
}
