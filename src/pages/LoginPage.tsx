import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export const LoginPage = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        await login(username, password);
        navigate("/dashboard");
      } catch (err) {
        setError("Login failed. Please check your credentials.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-2xl">
                D
              </span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="emilys"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isPending}
                data-testid="login-username-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="emilyspass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                data-testid="login-password-input"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              data-testid="login-submit-button"
            >
              {isPending ? (
                <>
                  <Spinner className="mr-2" size="sm" />
                  Logging in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Demo credentials: emilys / emilyspass
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
