import { useState, useEffect } from 'react';
import { roomApi } from '../api/roomApi';
import { Room, RoomFilters, RoomStatus, RoomType } from '../types/room.types';
import { RoomCard } from '../components/RoomCard';
import { RoomForm } from '../components/RoomForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [filters, setFilters] = useState<RoomFilters>({});
  const { toast } = useToast();

  const loadRooms = async () => {
    try {
      setIsLoading(true);
      const response = await roomApi.getAllRooms(filters);
      setRooms(response.content);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load rooms',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, [filters]);

  const handleCreateRoom = async (data: any) => {
    try {
      await roomApi.createRoom(data);
      toast({ title: 'Success', description: 'Room created successfully' });
      setIsDialogOpen(false);
      loadRooms();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create room', variant: 'destructive' });
    }
  };

  const handleUpdateRoom = async (data: any) => {
    if (!selectedRoom) return;
    try {
      await roomApi.updateRoom(selectedRoom.id, data);
      toast({ title: 'Success', description: 'Room updated successfully' });
      setIsDialogOpen(false);
      setSelectedRoom(undefined);
      loadRooms();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update room', variant: 'destructive' });
    }
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    try {
      await roomApi.deleteRoom(id);
      toast({ title: 'Success', description: 'Room deleted successfully' });
      loadRooms();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete room', variant: 'destructive' });
    }
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Room Management</h1>
        <Button onClick={() => { setSelectedRoom(undefined); setIsDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search rooms..."
            value={filters.search || ''}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full"
          />
        </div>
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters({ ...filters, status: value as RoomStatus })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            {Object.values(RoomStatus).map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.roomType}
          onValueChange={(value) => setFilters({ ...filters, roomType: value as RoomType })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            {Object.values(RoomType).map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading rooms...</div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No rooms found. Create your first room!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onEdit={handleEdit}
              onDelete={handleDeleteRoom}
              onViewDetails={(room) => console.log('View details:', room)}
            />
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRoom ? 'Edit Room' : 'Create New Room'}</DialogTitle>
          </DialogHeader>
          <RoomForm
            room={selectedRoom}
            onSubmit={selectedRoom ? handleUpdateRoom : handleCreateRoom}
            onCancel={() => { setIsDialogOpen(false); setSelectedRoom(undefined); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
