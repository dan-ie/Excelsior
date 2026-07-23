import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import { useState } from 'react';
import { toast } from "sonner";

type Props = {
    projectId: number;
}
export default function EmailContainer({projectId}:Props){

 const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
});

const [processing, setProcessing] = useState(false);
const updateEmailData = (updates: Partial<typeof emailData>) => {
    setEmailData((prev) => ({
        ...prev,
        ...updates,
    }));
};
const sendEmail = async () => {
     console.log("Button clicked");

    try {
       await axios.post("/email", emailData);

    } catch (error) {
        console.error(error);
    }
}
const saveEmail = async () => {
     console.log("Button clicked");

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
            <div className="flex items-center">
                <label className="w-16" >To:</label>
                <Input
                    value={emailData.to}
                    onChange={(e) => updateEmailData({ to: e.target.value })}
                    placeholder="email@example.com"
                />
            </div>

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
             onClick={sendEmail}
             className="mt-6 bg-blue-400 text-white hover:bg-blue-300 hover:text-[#808080]"
              >
             Send Email
         </Button>
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
