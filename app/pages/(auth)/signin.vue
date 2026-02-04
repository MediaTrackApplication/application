<script lang="ts" setup>
import * as z from 'zod'

import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  description: 'Sign in to your account to continue',
  title: 'Sign in',
})

const supabase = useSupabaseClient()

const authError = ref('')

const fields = [
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter your email',
    required: true,
    type: 'text',
  },
  {
    label: 'Password',
    name: 'password',
    placeholder: 'Enter your password',
    type: 'password',
  },
]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const onSubmit = async (payload: FormSubmitEvent<Schema>) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.data.email,
    password: payload.data.password,
  })

  if (error) authError.value = error.message
  if (data) navigateTo('/')
}
</script>

<template>
  <UAuthForm :fields :schema @submit="onSubmit" icon="i-lucide-lock" title="Welcome back">
    <template #description>
      Don't have an account? <ULink class="font-medium text-primary" to="/signup">Sign up</ULink>.
      Don't have an account? <ULink class="font-medium text-primary" to="/">Sign up</ULink>.
    </template>

    <template #password-hint>
      <ULink class="font-medium text-primary" tabindex="-1" to="/">Forgot password?</ULink>
    </template>

    <template v-if="authError" #validation>
      <UAlert
        class="my-4"
        :title="authError"
        color="error"
        icon="i-lucide-message-circle-warning"
      />
    </template>

    <template #footer>
      By signing in, you agree to our
      <ULink class="font-medium text-primary" to="/">Terms of Service</ULink>.
    </template>
  </UAuthForm>
</template>
