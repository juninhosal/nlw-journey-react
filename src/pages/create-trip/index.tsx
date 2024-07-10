import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import {ConfirmTripModal} from "./confirm-trip-modal.tsx";
import {DestinationAndDateStep} from "./steps/destination-and-date-step.tsx";
import {InviteGuestsStep} from "./steps/invite-guests-step.tsx";

export function CreateTripPage() {
    const navigate = useNavigate();

    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
    const [emailsToInvite, setEmailsToInvite] = useState([
        'paulo.salgado@gmail.com'
    ]);
    const [isConfirmTripModalOpen, setConfirmTripModalOpen] = useState(false);

    function openGuestsInput(){
        setIsGuestsInputOpen(true);
    }

    function closeGuestsInput(){
        setIsGuestsInputOpen(false);
    }
    function openGuestsModal(){
        setIsGuestsModalOpen(true);
    }

    function closeGuestsModal(){
        setIsGuestsModalOpen(false);
    }
    function openConfirmTripModal(){
        setConfirmTripModalOpen(true);
    }

    function closeConfirmTripModal(){
        setConfirmTripModalOpen(false);
    }

    function createTrip (event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        navigate('/trips/123')
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
        event.preventDefault();

        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString();

        if(!email){
            return;
        }

        if(emailsToInvite.includes(email)){
            return;
        }

        setEmailsToInvite([
            ...emailsToInvite,
            email
        ])

        event.currentTarget.reset()
    }

    function removeEmailFromInvites(emailToRemove: string){
        const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

        setEmailsToInvite(newEmailList);
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center text-lg space-y-10">
                <div className="flex flex-col  items-center gap-3">
                    <img src="/logo.svg" alt="plann.er"/>
                    <p className="text-zinc-300 text-lg">
                        Convide seus amigos e planeje sua próxima viagem!
                    </p>
                </div>
                <div className="space-y-4">
                    <DestinationAndDateStep
                    isGuestsInputOpen={isGuestsInputOpen}
                    closeGuestsInput={closeGuestsInput}
                    openGuestsInput={openGuestsInput}
                    />

                    {isGuestsInputOpen && (
                        <InviteGuestsStep
                        emailsToInvite={emailsToInvite}
                        openConfirmTripModal={openConfirmTripModal}
                        openGuestsModal={openGuestsModal}
                        />
                    )}
                </div>


                <p className="text-zinc-500 text-sm">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda <br/>
                    com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e
                    <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
                </p>
            </div>

            {isGuestsModalOpen && (
               <InviteGuestsModal
                   closeGuestsModal={closeGuestsModal}
                   emailsToInvite={emailsToInvite}
                   addNewEmailToInvite={addNewEmailToInvite}
                   removeEmailFromInvites={removeEmailFromInvites}
               />
            )}

            {isConfirmTripModalOpen && (
                <ConfirmTripModal
                    closeConfirmTripModal={closeConfirmTripModal}
                    createTrip={createTrip}
                />
            )}
        </div>
    )
}
