import {CircleCheck} from "lucide-react";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../../lib/axios.tsx";
import {format} from "date-fns";
import {ptBR} from 'date-fns/locale'

export function Activities() {

    interface Activity{
        date: string,
        activities: {
            id: string,
            title: string | null,
            occurs_at: string
        }[]
    }

    const {tripId} = useParams();
    const [activityes, setActivityes] = useState<Activity[]>([]);
    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setActivityes(response.data.activities));
    }, [tripId])

    return (
        <div className="space-y-8">

            {activityes.map(category => {
                return (
                    <div className="space-y-2.5">
                        <div key={category.date} className="flex items-baseline gap-2">
                                <span className="text-xl text-zinc-300 font-semibold">
                                    Dia {format(category.date, 'd')}
                                </span>
                            <span className="text-xs text-zinc-500">
                                    {format(category.date, 'EEEE', {locale: ptBR})}
                                </span>
                        </div>
                        {category.activities.length > 0 ? (
                            <div>
                                {category.activities.map(activity => {
                                    return (
                                        <div className="space-y-2.5">
                                            <div
                                                className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                                <CircleCheck className="size-5 text-lime-300"/>
                                                <span className="text-zinc-100">
                                                    {activity.title}
                                                </span>
                                                <span className="text-zinc-400 text-sm ml-auto">
                                                    {format(activity.occurs_at, 'HH:mm')}h
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-zinc-500 text-sm">
                                Nenhuma atividade cadastrada nessa data.
                            </p>
                        )}
                    </div>
                )
            })}
            <div className="space-y-2.5">
                <div className="flex items-baseline gap-2">
                                <span className="text-xl text-zinc-300 font-semibold">
                                    Dia 18
                                </span>
                    <span className="text-xs text-zinc-500">
                                    Domingo
                                </span>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300"/>
                        <span className="text-zinc-100">
                                        Academia em grupo
                                    </span>
                        <span className="text-zinc-400 text-sm ml-auto">
                                        08:00
                                    </span>
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                        <CircleCheck className="size-5 text-lime-300"/>
                        <span className="text-zinc-100">
                                        Academia em grupo
                                    </span>
                        <span className="text-zinc-400 text-sm ml-auto">
                                        08:00
                                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}