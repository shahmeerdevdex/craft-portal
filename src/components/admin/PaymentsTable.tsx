
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Loader2, CheckCircle, AlertCircle, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mocked data - would come from Supabase in a real implementation
const MOCK_PAYMENTS = [
  { 
    id: 'pay1', 
    jobId: 'job1', 
    jobTitle: 'Fix Kitchen Sink',
    amount: 350, 
    contractor: 'John Smith',
    contractorId: 'con1',
    status: 'pending', 
    date: '2023-06-15' 
  },
  { 
    id: 'pay2', 
    jobId: 'job2', 
    jobTitle: 'Repair Electrical Panel',
    amount: 450, 
    contractor: 'Maria Garcia',
    contractorId: 'con2',
    status: 'pending', 
    date: '2023-06-18' 
  },
  { 
    id: 'pay3', 
    jobId: 'job3', 
    jobTitle: 'Weekly Lawn Service',
    amount: 180, 
    contractor: 'David Johnson',
    contractorId: 'con3',
    status: 'paid', 
    date: '2023-06-20' 
  },
];

const PaymentsTable = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleProcessPayment = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    setSelectedPayment(payment);
    setDialogOpen(true);
  };

  const confirmPayment = () => {
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      // Update payment status
      const updatedPayments = payments.map(p => 
        p.id === selectedPayment.id ? { ...p, status: 'paid' } : p
      );
      setPayments(updatedPayments);
      setIsProcessing(false);
      setDialogOpen(false);
      
      toast({
        title: "Payment processed successfully",
        description: `$${selectedPayment.amount} has been paid to ${selectedPayment.contractor}`,
      });
    }, 1500);
  };

  const pendingPayments = payments.filter(payment => payment.status === 'pending');
  const completedPayments = payments.filter(payment => payment.status === 'paid');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Pending Payments</h3>
        {pendingPayments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Contractor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.jobTitle}</TableCell>
                  <TableCell>{payment.contractor}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                      onClick={() => handleProcessPayment(payment.id)}
                    >
                      <DollarSign className="mr-1 h-4 w-4" />
                      Process Payment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No pending payments</div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Recent Payments</h3>
        {completedPayments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Contractor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.jobTitle}</TableCell>
                  <TableCell>{payment.contractor}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">No completed payments</div>
        )}
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="py-4">
              <div className="mb-4 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium">{selectedPayment.jobTitle}</h3>
                <p className="text-sm text-muted-foreground mt-1">Contractor: {selectedPayment.contractor}</p>
                <p className="text-xl font-bold mt-2">${selectedPayment.amount}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-green-500">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Job completed and verified</span>
                </div>
                <div className="flex items-center text-amber-500">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>Payment will be processed immediately</span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={confirmPayment}
              disabled={isProcessing}
              className="bg-teal-500 hover:bg-teal-600"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Confirm Payment
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsTable;
