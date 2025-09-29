"use client";
import { MatchFormSchema } from "@/schema/match-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useActionState, useTransition } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
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
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Team, Venue } from "@/db/types";
import { Switch } from "@/components/ui/switch";

export default function QuickMatchForm({
  teams,
  venues,
  onFormAction,
}: {
  teams: Team[];
  venues: Venue[];
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
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(onFormAction, {
    message: "",
  });
  const form = useForm({
    resolver: zodResolver(MatchFormSchema),
    defaultValues: {
      matchDate: new Date(),
      tossWinnerId: 1,
      tossDecision: "bat",
      team1Id: 1,
      team2Id: 2,
      oversPerSide: 6,
      maxOverPerBowler: 2,
      hasLBW: false,
      hasBye: false,
      hasLegBye: false,
      hasBoundaryOut: false,
      hasSuperOver: false,
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    formData.set(
      "hasBoundaryOut",
      formData.get("hasBoundaryOut") === "on" ? "true" : "false"
    );
    formData.set("hasLBW", formData.get("hasLBW") === "on" ? "true" : "false");
    formData.set("hasBye", formData.get("hasBye") === "on" ? "true" : "false");
    formData.set(
      "hasLegBye",
      formData.get("hasLegBye") === "on" ? "true" : "false"
    );
    formData.set(
      "hasSuperOver",
      formData.get("hasSuperOver") === "on" ? "true" : "false"
    );
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        action={formAction}
        onSubmit={onSubmit}
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
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
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
                  <SelectTrigger className="w-full">
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
        <FormField
          control={form.control}
          name="hasBye"
          render={({ field }) => (
            <FormItem variant="inline" className="border rounded-sm px-2 py-3">
              <FormLabel className="w-24">Byes: </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="hasLegBye"
          render={({ field }) => (
            <FormItem variant="inline" className="border rounded-sm px-2 py-3">
              <FormLabel className="w-24">Leg Byes: </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="hasLBW"
          render={({ field }) => (
            <FormItem variant="inline" className="border rounded-sm px-2 py-3">
              <FormLabel className="w-24">LBW: </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="hasBoundaryOut"
          render={({ field }) => (
            <FormItem className="border rounded-sm px-2 py-3">
              <div className="flex gap-2">
                <FormLabel className="w-24">Boundary Out:</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                    name={field.name}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Player hitting out of the boundary would be deemed out.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="hasSuperOver"
          render={({ field }) => (
            <FormItem className="border rounded-sm px-2 py-3">
              <div className="flex gap-2">
                <FormLabel className="w-24">Super Over:</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value as boolean}
                    onCheckedChange={field.onChange}
                    name={field.name}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Enable if match goes to super over in case of a tie.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="venueId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={`${field.value}`}
                  name={field.name}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((venue) => (
                      <SelectItem key={venue.id} value={`${venue.id}`}>
                        {venue.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" className="my-4" disabled={isPending}>
          {isPending ? "Creating Match..." : "Create Match"}
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
