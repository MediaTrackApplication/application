<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  description: 'Create an account to get started',
  title: 'Sign up',
})

const supabase = useSupabaseClient()

const fields = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Enter your name',
    type: 'text',
  },
  {
    label: 'Media group name',
    name: 'media_group_name',
    placeholder: 'Enter your media group name (Address, Company, etc.)',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    placeholder: 'Enter your email',
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
  name: z.string().min(1, 'Name is required'),
  media_group_name: z.string().min(1, 'Name is required'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const onSubmit = async (payload: FormSubmitEvent<Schema>) => {
  const { data, error } = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      data: {
        media_group_name: payload.data.media_group_name,
        name: payload.data.name,
      },
    },
  })

  if (error) return console.error({ error })
  if (data) navigateTo('/signin')
}
</script>

<template>
  <UAuthForm
    :fields
    :schema
    :submit="{ label: 'Create account' }"
    @submit="onSubmit"
    title="Create an account"
  >
    <template #description>
      Already have an account? <ULink class="font-medium text-primary" to="/login">Login</ULink>.
    </template>

    <template #footer>
      By signing up, you agree to our
      <ULink class="font-medium text-primary" to="/">Terms of Service</ULink>.
    </template>
  </UAuthForm>
</template>
