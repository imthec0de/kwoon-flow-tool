// src/pages/Index.tsx
import SubscribeButton from "../SubscribeButton";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold">Welcome to Kwoon Flow Tool</h1>
      <p className="text-muted-foreground">
        Manage your dojo, classes, students, and progress — all in one place.
      </p>
      <SubscribeButton />
    </div>
  );
}
