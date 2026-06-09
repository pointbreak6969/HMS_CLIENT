"use client"
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiResponse {
  message: string;
}

export default function UsernameForm() {
  const [username, setUsername] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post<ApiResponse>(
        "http://localhost:5173/api/admin/createUser",
        {
          username,
        }
      );

      setResponse(res.data.message);
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;

      setResponse(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Username Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>

      {response && (
        <div className="rounded-md border p-3">
          {response}
        </div>
      )}
    </div>
  );
}