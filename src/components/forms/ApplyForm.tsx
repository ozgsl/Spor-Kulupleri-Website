"use client"

import React, { useActionState } from "react"
import { submitApplication, ActionState } from "@/app/actions/apply"
import { Button } from "@/components/ui/Button"
import { AlertCircle, Loader2 } from "lucide-react"
import { GamifiedSuccessCard } from "./GamifiedSuccessCard"
import { ApplicantInfoFields } from "./ApplicantInfoFields"
import { CourseSelectCard, CourseData } from "./CourseSelectCard"

interface ApplyFormProps {
  courses: CourseData[]
}

const initialState: ActionState = {
  success: undefined,
  message: "",
}

export function ApplyForm({ courses }: ApplyFormProps) {
  const [state, formAction, isPending] = useActionState(submitApplication, initialState)

  if (state.success) {
    return <GamifiedSuccessCard message={state.message || ""} />
  }

  return (
    <form action={formAction} className="space-y-6">
      
      {state.success === false && (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
          <p className="text-red-800 dark:text-red-400 font-medium text-sm">{state.message}</p>
        </div>
      )}

      <ApplicantInfoFields errors={state.errors} />
      
      <CourseSelectCard courses={courses} error={state.errors?.courseId?.[0]} />

      <div className="pt-6">
        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isPending || courses.length === 0}>
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> İşleniyor...
            </>
          ) : (
            "Başvuruyu Tamamla"
          )}
        </Button>
      </div>
    </form>
  )
}
