'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { CircleGaugeIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { cn } from '@/lib/tailwind'
import { signUp } from '@/auth/client'
import { toast } from 'sonner'
import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import z from 'zod'
import zxcvbn from 'zxcvbn'

const formSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .refine((password) => zxcvbn(password).score >= 3, {
        error: 'Password is not strong enough',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SignupFormProps = {
  redirect?: string
}

export const SignupForm = ({ redirect }: SignupFormProps) => {
  const router = useRouter()
  const safeRedirect = redirect?.startsWith('/') ? redirect : '/'

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      })

      if (error) {
        toast.error(error.message ?? 'Failed to sign up')
      } else {
        router.push(safeRedirect)
        router.refresh()
      }
    },
  })
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>Enter your email below to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      required
                      autoFocus
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      required
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            />
            <Field>
              <Field className="grid grid-cols-2 gap-4">
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          required
                        />
                      </Field>
                    )
                  }}
                />
                <form.Field
                  name="confirmPassword"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          required
                        />
                      </Field>
                    )
                  }}
                />
              </Field>
              <form.Subscribe
                selector={(state) => [state.values.password]}
                children={([password]) => {
                  const strength = zxcvbn(password)
                  const score = strength.score
                  const text = !password
                    ? 'Password is required'
                    : score === 0
                      ? 'Might as well not have a password'
                      : score === 1
                        ? 'Are you kidding me?'
                        : score === 2
                          ? 'My grandma could guess it'
                          : score === 3
                            ? 'Good enough'
                            : 'Do you work for the CIA?'
                  return (
                    <FieldDescription
                      className={cn(
                        'flex items-center gap-2 rounded-md border px-2 py-1 text-center text-white transition-all duration-300',
                        !password && 'text-muted-foreground',
                        password && score === 0 && 'bg-red-700',
                        score === 1 && 'bg-red-700',
                        score === 2 && 'bg-yellow-700',
                        score === 3 && 'bg-green-700',
                        score === 4 && 'bg-green-700',
                      )}
                    >
                      <CircleGaugeIcon className="size-4" />
                      {text}
                    </FieldDescription>
                  )
                }}
              />
              <form.Subscribe
                selector={(state) => [
                  state.fieldMeta.password?.isValid,
                  state.fieldMeta.confirmPassword?.isValid,
                ]}
                children={([passwordIsValid, confirmPasswordIsValid]) => {
                  return (
                    <>
                      {!passwordIsValid ||
                        (!confirmPasswordIsValid && (
                          <FieldError
                            errors={[
                              ...(form.state.fieldMeta.password?.errors || []),
                              ...(form.state.fieldMeta.confirmPassword?.errors || []),
                            ]}
                          />
                        ))}
                    </>
                  )
                }}
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="signup-form">
            Create Account
          </Button>
          <FieldDescription className="text-center">
            Already have an account?{' '}
            <Link
              href={
                safeRedirect !== '/'
                  ? `/login?redirect=${encodeURIComponent(safeRedirect)}`
                  : '/login'
              }
            >
              Login
            </Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  )
}
