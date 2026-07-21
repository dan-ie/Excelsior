import axios from "axios";


export default function EmailContainer(){
    return(
        <>
        {/* Has to have an input for email body and subject line */}
<<<<<<< Updated upstream
        <div className="bg-red-500">TestEmail</div>
        </>
    )
}
=======

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
         <div className="flex justify-center mt-5 gap-4 ">
         <Button
             onClick={sendEmail}
             className="mt-3 bg-blue-400 text-white hover:bg-blue-300 hover:text-[#808080]"
              >
             Send Email
         </Button>
         <Button
             onClick={saveEmail}
             className="mt-3  bg-blue-400 text-white hover:bg-blue-300 hover:text-[#808080]"
              >
             Save Email
         </Button>
         </div>
    </div>

        </>
        )
}
 
>>>>>>> Stashed changes
