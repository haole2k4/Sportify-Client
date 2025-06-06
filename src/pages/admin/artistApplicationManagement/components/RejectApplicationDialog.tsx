import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArtistApplication } from "@/utils/types";
import { ApplicationData } from "../ArtistApplicationManagementPage";
import { REJECTION_REASON_CHOICE, TupleChoice } from "@/utils/tuple";
import LoadingSpinner from "@/components/ui/loading";
import { SendHorizontal } from "lucide-react";

interface RejectApplicationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (status: string) => void;
  application?: ArtistApplication | null;
  applicationData: ApplicationData;
  handleApplicationChange: (
    field: keyof ApplicationData,
    value: string
  ) => void;
  isResponding: boolean;
}

const RejectApplicationDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  application,
  applicationData,
  handleApplicationChange,
  isResponding,
}: RejectApplicationDialogProps) => {
  if (!application) {
    return null;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => onOpenChange(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold text-white">
                  Reject Artist Application
                </Dialog.Title>
                <Dialog.Description className="text-white">
                  Please provide a reason for rejecting{" "}
                  {application.user?.fullName}'s application.
                </Dialog.Description>

                {application && (
                  <div className="py-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={application.user?.avatarUrl}
                          alt={application.user?.fullName}
                        />
                        <AvatarFallback>
                          {application.user?.fullName?.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-white">
                          {application.user?.fullName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {application.user?.email}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label
                          htmlFor="rejection-reason"
                          className="text-white"
                        >
                          Rejection Reason
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleApplicationChange("rejectionReason", value)
                          }
                        >
                          <SelectTrigger id="rejection-reason">
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>

                          <SelectContent>
                            {REJECTION_REASON_CHOICE.map(
                              (item: TupleChoice) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label
                          htmlFor="rejection-details"
                          className="text-white"
                        >
                          Additional Details
                        </Label>
                        <Textarea
                          id="rejection-details"
                          placeholder="Provide additional feedback"
                          rows={4}
                          value={applicationData.details}
                          onChange={(e) =>
                            handleApplicationChange("details", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between sm:justify-between p-4">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>

                  <Button
                    onClick={() => onConfirm("reject")}
                    className="bg-[#1DB954] hover:bg-[#1ed760] text-white"
                    disabled={!applicationData.rejectionReason || isResponding}
                  >
                    {isResponding ? (
                      <>
                        <LoadingSpinner />
                        Rejecting...
                      </>
                    ) : (
                      <>
                        <SendHorizontal className="h-4 w-4" />
                        Reject
                      </>
                    )}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RejectApplicationDialog;
