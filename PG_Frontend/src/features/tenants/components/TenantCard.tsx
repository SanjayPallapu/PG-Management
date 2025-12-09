import { Tenant, TenantStatus } from '../types/tenant.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Trash2, Phone, Mail, Home, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface TenantCardProps {
  tenant: Tenant;
  onEdit: (tenant: Tenant) => void;
  onDelete: (id: string) => void;
  onViewDetails: (tenant: Tenant) => void;
}

export const TenantCard = ({ tenant, onEdit, onDelete, onViewDetails }: TenantCardProps) => {
  const getStatusColor = (status: TenantStatus) => {
    switch (status) {
      case TenantStatus.ACTIVE:
        return 'bg-green-500';
      case TenantStatus.INACTIVE:
        return 'bg-gray-500';
      case TenantStatus.PENDING:
        return 'bg-yellow-500';
      case TenantStatus.VACATED:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={tenant.photoUrl} alt={tenant.name} />
            <AvatarFallback>{tenant.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="flex items-center justify-between">
              <span>{tenant.name}</span>
              <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">Room: {tenant.roomNumber}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{tenant.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{tenant.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Joined: {format(new Date(tenant.dateOfJoining), 'MMM dd, yyyy')}</span>
          </div>
        </div>
        <div className="pt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Monthly Rent:</span>
            <span className="font-semibold">₹{tenant.monthlyRent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Deposit:</span>
            <span className="font-semibold">₹{tenant.depositPaid.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(tenant)} className="flex-1">
            Details
          </Button>
          <Button variant="outline" size="sm" onClick={() => onEdit(tenant)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(tenant.id)} className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
