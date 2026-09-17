"use client"

import { useState, useMemo } from "react"
import { NeoButton } from "@/components/ui/NeoButton"
import { NeoCard } from "@/components/ui/NeoCard"
import { ChevronLeft, ChevronRight, Calendar, Clock, Grid3x3, List, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Event {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  color: string
  category?: string
  attendees?: string[]
  tags?: string[]
}

export interface EventManagerProps {
  events?: Event[]
  categories?: string[]
  colors?: { name: string; value: string; bg: string; text: string }[]
  defaultView?: "month" | "week" | "day" | "list"
  className?: string
  availableTags?: string[]
}

const defaultColors = [
  { name: "Blue", value: "blue", bg: "bg-[#3392cc]", text: "text-white" },
  { name: "Green", value: "green", bg: "bg-[#4CAF50]", text: "text-white" },
  { name: "Purple", value: "purple", bg: "bg-[#5227FF]", text: "text-white" },
  { name: "Orange", value: "orange", bg: "bg-[#f47b2b]", text: "text-white" },
  { name: "Yellow", value: "yellow", bg: "bg-[#FFDE59]", text: "text-black" },
  { name: "Red", value: "red", bg: "bg-[#E53935]", text: "text-white" },
]

export function EventManager({
  events = [],
  categories = ["Meetings", "Competitions", "Workshops", "Seminar"],
  colors = defaultColors,
  defaultView = "month",
  className,
  availableTags = ["Important", "Urgent", "General", "Mega", "Team", "ACM", "NSU", "Inter-University", "Intra-University", "Intra-ACM"],
}: EventManagerProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day" | "list">(defaultView)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedColor, setSelectedColor] = useState<string>("All")
  const [selectedTag, setSelectedTag] = useState<string>("All")
  const [selectedListMonth, setSelectedListMonth] = useState<string>("All")
  const [selectedListYear, setSelectedListYear] = useState<string>("All")

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          event.title.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.category?.toLowerCase().includes(query) ||
          event.tags?.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesSearch) return false
      }
      if (selectedCategory !== "All" && event.category !== selectedCategory) {
        return false
      }
      if (selectedColor !== "All" && event.color !== selectedColor) {
        return false
      }
      if (selectedTag !== "All" && (!event.tags || !event.tags.includes(selectedTag))) {
        return false
      }
      return true
    })
  }, [events, searchQuery, selectedCategory, selectedColor, selectedTag])

  const navigateDate = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (view === "month" || view === "list") {
        newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1))
      } else if (view === "week") {
        newDate.setDate(prev.getDate() + (direction === "next" ? 7 : -7))
      } else if (view === "day") {
        newDate.setDate(prev.getDate() + (direction === "next" ? 1 : -1))
      }
      return newDate
    })
  }

  const getWeekDays = (date: Date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay())
    const days = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      days.push(d)
    }
    return days
  }

  const renderEventBlock = (e: Event, showDetails = false) => {
    const color = colors.find(c => c.value === e.color) || colors[0]
    return (
      <div key={e.id} className={cn("text-xs p-1 px-1.5 border-2 border-black font-bold mb-1", color.bg, color.text)}>
        <div>{e.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {e.title}</div>
        {showDetails && e.description && <div className="mt-1 font-medium opacity-90 line-clamp-2">{e.description}</div>}
      </div>
    )
  }

  const renderMonthView = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    return (
      <div className="grid grid-cols-7 gap-1 md:gap-3 mt-6">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-bold font-display uppercase tracking-wider text-center border-b-4 border-black pb-2 text-sm md:text-base">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[100px] md:min-h-[120px]" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1
          const dayEvents = filteredEvents.filter(
            (e) => e.startTime.getDate() === date && e.startTime.getMonth() === currentDate.getMonth() && e.startTime.getFullYear() === currentDate.getFullYear()
          )
          
          const isToday = new Date().getDate() === date && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
          
          return (
            <NeoCard 
              key={date} 
              variant={isToday ? "yellow" : "default"} 
              shadow="none" 
              className={cn("min-h-[100px] md:min-h-[120px] p-2 flex flex-col gap-1 transition-colors hover:bg-black/5 border-2", isToday ? "border-black" : "border-black/20")}
            >
              <span className={cn("font-black text-sm w-7 h-7 flex items-center justify-center", isToday ? "bg-black text-white" : "")}>{date}</span>
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                {dayEvents.map(e => renderEventBlock(e))}
              </div>
            </NeoCard>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate)
    return (
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 md:gap-2 mt-6">
        {weekDays.map((date, i) => {
          const isToday = new Date().toDateString() === date.toDateString()
          return (
            <div key={i} className="flex flex-col">
              <div className={cn("font-bold font-display uppercase tracking-wider text-center border-b-4 border-black pb-2 text-sm md:text-base mb-2", isToday ? "text-[#f47b2b]" : "")}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]} <br/>
                <span className={cn("text-xl", isToday ? "bg-black text-white px-2 py-0.5" : "")}>{date.getDate()}</span>
              </div>
              <NeoCard variant={isToday ? "yellow" : "default"} shadow="none" className={cn("min-h-[150px] md:min-h-[300px] p-2 flex flex-col gap-1 transition-colors border-2", isToday ? "border-black" : "border-black/20")}>
                <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                  {filteredEvents
                    .filter((e) => e.startTime.toDateString() === date.toDateString())
                    .map(e => renderEventBlock(e, true))}
                </div>
              </NeoCard>
            </div>
          )
        })}
      </div>
    )
  }

  const renderDayView = () => {
    const dayEvents = filteredEvents
      .filter(e => e.startTime.toDateString() === currentDate.toDateString())
      .sort((a,b) => a.startTime.getTime() - b.startTime.getTime())

    return (
      <div className="mt-6 flex flex-col gap-4">
        {dayEvents.length === 0 ? (
           <div className="mt-4 text-center py-16 border-4 border-black border-dashed bg-white">
             <p className="font-bold text-xl uppercase tracking-wide text-black/70">No events scheduled on this day.</p>
           </div>
        ) : (
          dayEvents.map(e => {
            const color = colors.find(c => c.value === e.color) || colors[0]
            return (
             <NeoCard key={e.id} className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
               <div>
                 <div className="flex items-center gap-3 mb-3 flex-wrap">
                   <span className={cn("px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_#000]", color.bg, color.text)}>{e.category || "Event"}</span>
                   <span className="font-bold text-sm text-black/70 flex items-center gap-1">
                     <Clock className="w-4 h-4"/> {e.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     {e.endTime && ` - ${e.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                   </span>
                 </div>
                 <h3 className="font-black font-display text-2xl uppercase tracking-tight">{e.title}</h3>
                 {e.description && <p className="mt-2 text-black/80 font-medium text-lg">{e.description}</p>}
                 {e.tags && e.tags.length > 0 && (
                   <div className="flex gap-2 mt-3 flex-wrap">
                     {e.tags.map(tag => (
                       <span key={tag} className="text-xs font-bold border-2 border-black px-2 py-0.5 bg-black/5">#{tag}</span>
                     ))}
                   </div>
                 )}
               </div>
             </NeoCard>
            )
         })
        )}
      </div>
    )
  }

  const renderListView = () => {
    let listEvents = [...filteredEvents].sort((a,b) => b.startTime.getTime() - a.startTime.getTime())
    
    if (selectedListMonth !== "All") {
      listEvents = listEvents.filter(e => e.startTime.getMonth() === parseInt(selectedListMonth))
    }
    if (selectedListYear !== "All") {
      listEvents = listEvents.filter(e => e.startTime.getFullYear() === parseInt(selectedListYear))
    }
    
    if (listEvents.length === 0) {
      return (
        <div className="mt-8 text-center py-16 border-4 border-black border-dashed bg-white">
          <p className="font-bold text-xl uppercase tracking-wide text-black/70">No events found.</p>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-6 mt-6">
        {listEvents.map(e => {
           const color = colors.find(c => c.value === e.color) || colors[0]
           return (
            <NeoCard key={e.id} interactive className="p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={cn("px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_#000]", color.bg, color.text)}>{e.category || "Event"}</span>
                  <span className="font-bold text-sm text-black/70 flex items-center gap-1">
                    <Calendar className="w-4 h-4"/> {e.startTime.toLocaleDateString()} 
                    <Clock className="w-4 h-4 ml-2"/> {e.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h3 className="font-black font-display text-2xl uppercase tracking-tight">{e.title}</h3>
                {e.description && <p className="mt-2 text-black/80 font-medium text-lg">{e.description}</p>}
                {e.tags && e.tags.length > 0 && (
                   <div className="flex gap-2 mt-3 flex-wrap">
                     {e.tags.map(tag => (
                       <span key={tag} className="text-xs font-bold border-2 border-black px-2 py-0.5 bg-black/5">#{tag}</span>
                     ))}
                   </div>
                 )}
              </div>
              <NeoButton variant="primary" className="md:w-auto w-full flex-shrink-0 whitespace-nowrap">View Details</NeoButton>
            </NeoCard>
           )
        })}
      </div>
    )
  }

  let headerText = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
  if (view === "week") {
    const weekDays = getWeekDays(currentDate)
    const first = weekDays[0]
    const last = weekDays[6]
    if (first.getMonth() === last.getMonth()) {
      headerText = `${first.toLocaleString('default', { month: 'short' })} ${first.getDate()} - ${last.getDate()}, ${first.getFullYear()}`
    } else {
      headerText = `${first.toLocaleString('default', { month: 'short' })} ${first.getDate()} - ${last.toLocaleString('default', { month: 'short' })} ${last.getDate()}, ${first.getFullYear()}`
    }
  } else if (view === "day") {
    headerText = currentDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })
  } else if (view === "list") {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    if (selectedListMonth === "All" && selectedListYear === "All") headerText = "All Events"
    else if (selectedListMonth !== "All" && selectedListYear === "All") headerText = "Events in " + months[parseInt(selectedListMonth)]
    else if (selectedListMonth === "All" && selectedListYear !== "All") headerText = "Events in " + selectedListYear
    else headerText = months[parseInt(selectedListMonth)] + " " + selectedListYear
  }

  return (
    <div className={cn("w-full max-w-7xl mx-auto flex flex-col gap-6", className)}>
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          {view !== "list" ? (
            <NeoButton variant="outline" size="sm" className="px-3" onClick={() => navigateDate("prev")}><ChevronLeft /></NeoButton>
          ) : <div className="w-[42px]" />}
          <h2 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tight min-w-[220px] text-center">
            {headerText}
          </h2>
          {view !== "list" ? (
            <NeoButton variant="outline" size="sm" className="px-3" onClick={() => navigateDate("next")}><ChevronRight /></NeoButton>
          ) : <div className="w-[42px]" />}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
           <NeoButton variant={view === 'month' ? 'primary' : 'outline'} className="flex-1 md:flex-none" onClick={() => setView('month')}>
             <Grid3x3 className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">Month</span>
           </NeoButton>
           <NeoButton variant={view === 'week' ? 'primary' : 'outline'} className="flex-1 md:flex-none" onClick={() => setView('week')}>
             <Calendar className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">Week</span>
           </NeoButton>
           <NeoButton variant={view === 'day' ? 'primary' : 'outline'} className="flex-1 md:flex-none" onClick={() => setView('day')}>
             <Clock className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">Day</span>
           </NeoButton>
           <NeoButton variant={view === 'list' ? 'primary' : 'outline'} className="flex-1 md:flex-none" onClick={() => setView('list')}>
             <List className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline">List</span>
           </NeoButton>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4">
        <div className="relative w-full flex-1 min-w-[200px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
          <input 
            style={{ outline: "none" }}
            className="w-full border-2 border-black pl-12 pr-10 py-3 focus:outline-none focus:ring-4 focus:ring-black transition-all text-base md:text-lg font-bold placeholder:font-medium placeholder:text-black/40"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-[#f47b2b] transition-colors" onClick={() => setSearchQuery("")}><X className="w-6 h-6" /></button>
          )}
        </div>
        
        <div className="flex w-full lg:w-auto gap-4 overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
          {view === "list" && (
            <>
              <select 
                style={{ outline: "none" }}
                className="w-full sm:w-auto border-2 border-black py-3 px-3 md:px-5 focus:outline-none focus:ring-4 focus:ring-black transition-all bg-white font-bold text-sm md:text-base cursor-pointer shrink-0"
                value={selectedListMonth}
                onChange={(e) => setSelectedListMonth(e.target.value)}
              >
                <option value="All">All Months</option>
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
              <select 
                style={{ outline: "none" }}
                className="w-full sm:w-auto border-2 border-black py-3 px-3 md:px-5 focus:outline-none focus:ring-4 focus:ring-black transition-all bg-white font-bold text-sm md:text-base cursor-pointer shrink-0"
                value={selectedListYear}
                onChange={(e) => setSelectedListYear(e.target.value)}
              >
                <option value="All">All Years</option>
                {[2024, 2025, 2026, 2027, 2028].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </>
          )}
          <select 
            style={{ outline: "none" }}
            className="w-full sm:w-auto border-2 border-black py-3 px-3 md:px-5 focus:outline-none focus:ring-4 focus:ring-black transition-all bg-white font-bold text-sm md:text-base cursor-pointer shrink-0"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          
          <select 
            style={{ outline: "none" }}
            className="w-full sm:w-auto border-2 border-black py-3 px-3 md:px-5 focus:outline-none focus:ring-4 focus:ring-black transition-all bg-white font-bold text-sm md:text-base cursor-pointer shrink-0"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="All">Colors</option>
            {colors.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
          </select>
          
          <select 
            style={{ outline: "none" }}
            className="w-full sm:w-auto border-2 border-black py-3 px-3 md:px-5 focus:outline-none focus:ring-4 focus:ring-black transition-all bg-white font-bold text-sm md:text-base cursor-pointer shrink-0"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="All">Tags</option>
            {availableTags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Calendar Body */}
      <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-4 md:p-8">
        {view === 'month' && renderMonthView()}
        {view === 'week' && renderWeekView()}
        {view === 'day' && renderDayView()}
        {view === 'list' && renderListView()}
      </div>
    </div>
  )
}
