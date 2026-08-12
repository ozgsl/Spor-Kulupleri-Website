"use client"

import { useState } from "react"
import { ApplicationList } from "./ApplicationList"
import { TrainerForm } from "./forms/TrainerForm"
import { FacilityForm } from "./forms/FacilityForm"
import { CourseForm } from "./forms/CourseForm"

type AdminTabsProps = {
  applications: any[]
  dashboardData: {
    trainers: any[]
    facilities: any[]
    courses: any[]
  }
}

export function AdminTabs({ applications, dashboardData }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<"APPLICATIONS" | "COURSES" | "TRAINERS" | "FACILITIES">("APPLICATIONS")

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b-2 border-foreground mb-8">
        {[
          { id: "APPLICATIONS", label: "Başvurular" },
          { id: "COURSES", label: "Kurs Yönetimi" },
          { id: "TRAINERS", label: "Eğitmen Yönetimi" },
          { id: "FACILITIES", label: "Tesis Yönetimi" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-bold text-sm sm:text-base border-t-2 border-l-2 border-r-2 -mb-[2px] transition-colors ${
              activeTab === tab.id 
                ? "bg-background text-foreground border-foreground border-b-background z-10" 
                : "bg-[#eaddcd] dark:bg-[#20150e] text-foreground/70 border-transparent hover:text-foreground hover:bg-[#d8c3ad] dark:hover:bg-[#2a1d15]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "APPLICATIONS" && (
          <div className="animate-in fade-in duration-300">
            <ApplicationList initialApplications={applications} />
          </div>
        )}
        
        {activeTab === "COURSES" && (
          <div className="animate-in fade-in duration-300">
            <div className="mb-8 p-4 bg-white dark:bg-[#1a120d] border border-slate-300 dark:border-slate-700 rounded-sm">
              <h2 className="text-lg font-bold mb-2">Mevcut Kurslar ({dashboardData.courses.length})</h2>
              <ul className="list-disc list-inside text-sm text-foreground/80">
                {dashboardData.courses.map(c => (
                  <li key={c.id}>
                    <strong>{c.title}</strong> - {c.trainer.firstName} {c.trainer.lastName} ({c.facility.name})
                  </li>
                ))}
              </ul>
            </div>
            <CourseForm trainers={dashboardData.trainers} facilities={dashboardData.facilities} />
          </div>
        )}

        {activeTab === "TRAINERS" && (
          <div className="animate-in fade-in duration-300">
            <div className="mb-8 p-4 bg-white dark:bg-[#1a120d] border border-slate-300 dark:border-slate-700 rounded-sm">
              <h2 className="text-lg font-bold mb-2">Sistemdeki Eğitmenler ({dashboardData.trainers.length})</h2>
              <ul className="list-disc list-inside text-sm text-foreground/80">
                {dashboardData.trainers.map(t => (
                  <li key={t.id}>{t.firstName} {t.lastName} - {t.branch}</li>
                ))}
              </ul>
            </div>
            <TrainerForm />
          </div>
        )}

        {activeTab === "FACILITIES" && (
          <div className="animate-in fade-in duration-300">
             <div className="mb-8 p-4 bg-white dark:bg-[#1a120d] border border-slate-300 dark:border-slate-700 rounded-sm">
              <h2 className="text-lg font-bold mb-2">Mevcut Tesisler ({dashboardData.facilities.length})</h2>
              <ul className="list-disc list-inside text-sm text-foreground/80">
                {dashboardData.facilities.map(f => (
                  <li key={f.id}>{f.name} ({f.capacity} Kişilik)</li>
                ))}
              </ul>
            </div>
            <FacilityForm />
          </div>
        )}
      </div>
    </div>
  )
}
