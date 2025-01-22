import { Bot, CreditCard, LayoutDashboard, Presentation } from 'lucide-react'
export interface Items{
    title:string,
    url:string,
    icon?: string,
    
}
export const item=[
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: 'Meetings',
        url: '/meetings',
        icon: Presentation
      },
      {
        title: 'Q&A',
        url: '/qa',
        icon: Bot
      },
      {
        title: 'Billing',
        url: '/billing',
        icon: CreditCard
      },
]