using System.Linq;

namespace ARCCv2.Business.Helpers
{
    public class StatusTypes : BusinessBase
    {
        private int _pendingSubmission;
        public int PendingSubmission
        {
            get { return _pendingSubmission; }
            private set
            {
                _pendingSubmission = (from s in Uow.StatusRepository.GetAll()
                                       where s.StatusDescription == "Pending Submission"
                                       select s.StatusId).FirstOrDefault();
            }
        }

        private int _submittedPendingApproval;
        public int SubmittedPendingApproval
        {
            get { return _submittedPendingApproval; }
            private set
            {
                _submittedPendingApproval = (from s in Uow.StatusRepository.GetAll()
                                            where s.StatusDescription == "Submitted - Pending Approval"
                                             select s.StatusId).FirstOrDefault();
            }
        }

        private int _approved;
        public int Approved
        {
            get { return _approved; }
            private set
            {
                _approved = (from s in Uow.StatusRepository.GetAll()
                                      where s.StatusDescription == "Approved"
                                      select s.StatusId).FirstOrDefault();
            }
        }

        private int _notApproved;
        public int NotApproved
        {
            get { return _notApproved; }
            private set
            {
                _notApproved = (from s in Uow.StatusRepository.GetAll()
                                      where s.StatusDescription == "Not Approved"
                                      select s.StatusId).FirstOrDefault();
            }
        }

        public StatusTypes()
        {
            PendingSubmission = new int();
            SubmittedPendingApproval = new int();
            Approved = new int();
            NotApproved = new int();
        }
    }
}
