import { createContext, useCallback, useContext, useState } from "react";
import Dialog from "src/components/Common/Dialog";

interface DialogContextValue {
  open(config: DialogConfig): void;
}

interface DialogConfig {
  title: string;
  content: string;
  onClose(): void;
  onConfirm(): void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export function DialogProvider({ children }: Props) {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<DialogConfig | null>(null);

  const open = useCallback((config: DialogConfig) => {
    setVisible(true);
    setConfig(config);
  }, []);

  const close = useCallback(() => {
    config?.onClose();
    setVisible(false);
  }, [config]);

  const confirm = useCallback(() => {
    config?.onConfirm();
    setVisible(false);
  }, [config]);

  const value = { open };
  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog
        visible={visible}
        title={config?.title ?? ""}
        content={config?.content ?? ""}
        onConfirm={confirm}
        onClose={close}
      />
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
}
