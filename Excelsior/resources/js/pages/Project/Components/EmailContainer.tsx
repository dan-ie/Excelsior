import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import { useState } from 'react';
import { toast } from "sonner";
type Email = {
    subject: string;
    message: string;
}
type Props = {
    projectId: number;
    emailTemplate: Email;
}
export default function EmailContainer({emailTemplate, projectId}:Props){

 const [emailData, setEmailData] = useState({
    subject: emailTemplate.subject ?? '',
    message: emailTemplate.message ?? "",
});

const [processing, setProcessing] = useState(false);
const updateEmailData = (updates: Partial<typeof emailData>) => {
    setEmailData((prev) => ({
        ...prev,
        ...updates,
    }));
};

const saveEmail = async () => {

    try {
        const response = await axios.post(`/project/${projectId}/email-create`, emailData);
        toast(response.data.message)

    } catch (error) {
        console.error(error);
    }
}

    return(
        <>
        {/* Has to have an input for email body and subject line */}

    <div className="py-3 space-y-6">
        <div className="text-[#303131] dark:text-[#D3D4D4] text-center">Email Composer</div>
          <br />

            <div>
                <Input
                    value={emailData.subject}
                    onChange={(e) => updateEmailData({ subject: e.target.value })}
                    placeholder="Subject"
                />
            </div>
            <div>
                <textarea

                    value={emailData.message}
                    onChange={(e) => updateEmailData({ message: e.target.value })}
                    className=" align-top p-3 pt-3 h-40 w-full border rounded-md"
                    placeholder="Message"

                />
            </div>
         <div className="flex justify-center mt-5 ">
         
         <Button
             onClick={saveEmail}
             className="mt-6 bg-blue-400 text-white hover:bg-blue-300 hover:text-[#808080]"
              >
             Save Email
         </Button>
         </div>
    </div>

        </>
        )
}
