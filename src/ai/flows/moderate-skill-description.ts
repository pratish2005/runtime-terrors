'use server';

/**
 * @fileOverview AI-powered tool for moderating skill descriptions.
 *
 * - moderateSkillDescription - A function that checks if a skill description is appropriate.
 * - ModerateSkillDescriptionInput - The input type for the moderateSkillDescription function.
 * - ModerateSkillDescriptionOutput - The return type for the moderateSkillDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateSkillDescriptionInputSchema = z.object({
  skillDescription: z
    .string()
    .describe('The skill description to be moderated.'),
});
export type ModerateSkillDescriptionInput = z.infer<
  typeof ModerateSkillDescriptionInputSchema
>;

const ModerateSkillDescriptionOutputSchema = z.object({
  isAppropriate: z
    .boolean()
    .describe(
      'Whether the skill description is appropriate based on community guidelines and policy.'
    ),
  reason: z
    .string()
    .optional()
    .describe('The reason why the skill description is not appropriate.'),
});
export type ModerateSkillDescriptionOutput = z.infer<
  typeof ModerateSkillDescriptionOutputSchema
>;

export async function moderateSkillDescription(
  input: ModerateSkillDescriptionInput
): Promise<ModerateSkillDescriptionOutput> {
  return moderateSkillDescriptionFlow(input);
}

const moderateSkillDescriptionPrompt = ai.definePrompt({
  name: 'moderateSkillDescriptionPrompt',
  input: {schema: ModerateSkillDescriptionInputSchema},
  output: {schema: ModerateSkillDescriptionOutputSchema},
  prompt: `You are an AI content moderator responsible for determining whether a skill description is appropriate for our platform based on community guidelines and policy.\n\nCommunity Guidelines:\n1. No hate speech or discrimination.\n2. No illegal activities.\n3. No sexually explicit content.\n4. No spam or misleading information.\n5. Respectful and constructive language only.\n\nSkill Description: {{{skillDescription}}}\n\nIs the skill description appropriate? Respond with a JSON object that contains the isAppropriate field. If isAppropriate is false, include a reason field explaining why the skill description is not appropriate.`,
});

const moderateSkillDescriptionFlow = ai.defineFlow(
  {
    name: 'moderateSkillDescriptionFlow',
    inputSchema: ModerateSkillDescriptionInputSchema,
    outputSchema: ModerateSkillDescriptionOutputSchema,
  },
  async input => {
    const {output} = await moderateSkillDescriptionPrompt(input);
    return output!;
  }
);
