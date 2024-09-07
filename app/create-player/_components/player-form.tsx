"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { playerFormSchema } from "@/schema/player-schema";
import { useFormState } from "react-dom";
import { useRef } from "react";
function PlayerForm({
  onFormAction,
}: {
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
  const form = useForm<z.infer<typeof playerFormSchema>>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      name: "",
      age: 0,
      battingStance: "Right handed",
      bowlingStance: "Right arm medium",
      isWicketKeeper: false,
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
                <Input placeholder="Player Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Player Age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="battingStance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batting Stance</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Batting Stance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Right handed">Right handed</SelectItem>
                    <SelectItem value="Left handed">Left handed</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="bowlingStance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bowling Style</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bowling Style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Right arm medium">
                      Right arm medium
                    </SelectItem>
                    <SelectItem value="Right arm fast">
                      Left arm medium
                    </SelectItem>
                    <SelectItem value="Right arm orthodox">
                      Right arm orthodox
                    </SelectItem>
                    <SelectItem value="Left arm orthodox">
                      Left arm orthodox
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="isWicketKeeper"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center rounded-lg border pt-2 pb-4 px-4">
              <FormLabel className="mt-2">Is Wicket Keeper</FormLabel>
              <FormControl>
                <Switch
                  onCheckedChange={(e) => {
                    console.log(e);
                    field.onChange(e);
                  }}
                  checked={field.value}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" className="my-4">
          Create Player
        </Button>
        {state.message && <p className="text-center">{state.message}</p>}
        {state.error && (
          <p className="text-center text-red-500 text-sm">{state.error}</p>
        )}
      </form>
    </Form>
  );
}

export default PlayerForm;
