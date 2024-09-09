"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Player } from "@/db/types";
import { teamFormSchema } from "@/schema/team-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

function TeamForm({
  players,
  onFormAction,
}: {
  players: Player[];
  onFormAction: (
    prevState: {
      message: string;
      error?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    error?: string[];
  }>;
}) {
  const [state, formAction] = useFormState(onFormAction, {
    message: "",
  });
  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: "",
      shortName: "",
      captain: 1,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Team Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="shortName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Name</FormLabel>
              <FormControl>
                <Input placeholder="Team Short Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="captain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Captain</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={`${field.value}`}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Batting Stance" />
                  </SelectTrigger>
                  <SelectContent>
                    {players.map((player) => (
                      <SelectItem key={player.id} value={`${player.id}`}>
                        {player.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" className="my-4">
          Save Team
        </Button>
        <p className="text-muted-foreground text-sm">{state.message}</p>
        <p className="text-red-500 text-sm">{state.error}</p>
      </form>
    </Form>
  );
}

export default TeamForm;
