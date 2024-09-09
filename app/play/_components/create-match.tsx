"use client";
import { MatchFormSchema } from "@/schema/match-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Team } from "@/db/types";

export default function QuickMatchForm({
  teams,
  onFormAction,
}: {
  teams: Team[];
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
  const form = useForm<z.infer<typeof MatchFormSchema>>({
    resolver: zodResolver(MatchFormSchema),
    defaultValues: {
      matchDate: new Date(),
      tossWinnerId: 1,
      tossDecision: "bat",
      team1Id: 1,
      team2Id: 2,
      oversPerSide: 6,
      maxOverPerBowler: 2,
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
          name="matchDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Match Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "w-full md:w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < subDays(date, 1)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="team1Id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batting First Team</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={`${field.value}`}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={`${team.id}`}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="team2Id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batting Second Team</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={`${field.value}`}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={`${team.id}`}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="tossWinnerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Toss Winner</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={`${field.value}`}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={`${team.id}`}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="tossDecision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Toss Decision</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="bat" value="bat">
                      Bat First
                    </SelectItem>
                    <SelectItem key="bowl" value="bowl">
                      Field First
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
          name="oversPerSide"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overs Per Side</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Overs Per Side" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="maxOverPerBowler"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Overs Per Bowler</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Max Overs Per Bowler"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <Button type="submit" className="my-4">
          Create Match
        </Button>
        <p className="">{state.message}</p>
        {state.error &&
          state.error.map((error) => (
            <p className="text-red-500 space-y-2" key={error}>
              {error}
            </p>
          ))}
      </form>
    </Form>
  );
}
