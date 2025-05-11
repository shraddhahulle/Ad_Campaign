
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StepCardProps = {
  title: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

const StepCard = ({
  title,
  description,
  selected = false,
  onClick,
  className,
  children,
  icon,
  disabled = false,
}: StepCardProps) => {
  return (
    <Card
      className={cn(
        "step-card cursor-pointer border-2",
        selected ? "border-primary" : "border-border",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50",
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default StepCard;
