import { Room, RoomStatus } from '../types/room.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Users, DollarSign, Home } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onEdit: (room: Room) => void;
  onDelete: (id: string) => void;
  onViewDetails: (room: Room) => void;
}

export const RoomCard = ({ room, onEdit, onDelete, onViewDetails }: RoomCardProps) => {
  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE:
        return 'bg-green-500';
      case RoomStatus.OCCUPIED:
        return 'bg-blue-500';
      case RoomStatus.MAINTENANCE:
        return 'bg-yellow-500';
      case RoomStatus.RESERVED:
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <CardTitle>{room.roomNumber}</CardTitle>
          </div>
          <Badge className={getStatusColor(room.status)}>{room.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{room.roomType}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4" />
            <span>
              {room.currentOccupancy}/{room.capacity} Occupied
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Floor {room.floor}</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-semibold">₹{room.rentAmount.toLocaleString()}/month</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Deposit: ₹{room.depositAmount.toLocaleString()}
          </div>
        </div>

        {room.amenities && room.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {room.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {room.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{room.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {room.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{room.description}</p>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(room)} className="flex-1">
          View Details
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(room)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(room.id)}
          className="text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
