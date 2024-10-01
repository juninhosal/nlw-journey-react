import {Calendar, MapPin, Settings2} from "lucide-react";
import {Button} from "../../components/button.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {api} from "../../lib/axios.tsx";
import {format} from "date-fns";
export function DestinationAndDateHeader(){

    interface Trip {
        destination: string
        ends_at: string
        starts_at: string
        id: string
        is_confirmed: boolean
    }
    const {tripId} = useParams();
    const [trip, setTrip] = useState<Trip | undefined>();
    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip));
    }, [tripId])

    const displayedDate = trip
        ? format(trip.starts_at,"d ' de ' LLL").concat(" até ").concat(format(trip.ends_at,"d ' de ' LLL"))
        : null

    console.log(setTrip);

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400"/>
                <span className="text-zinc-100">{trip?.destination}</span>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100">{displayedDate}</span>
                </div>

                <div className="w-px h-6 bg-zinc-800"></div>
                <Button variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5"/>
                </Button>
            </div>
        </div>
    )
}