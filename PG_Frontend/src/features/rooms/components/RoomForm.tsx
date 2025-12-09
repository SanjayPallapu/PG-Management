import { useState, useEffect } from 'react';
import { Room, RoomRequest, RoomType, RoomStatus } from '../types/room.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface RoomFormProps {
  room?: Room;
  onSubmit: (data: RoomRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const RoomForm = ({ room, onSubmit, onCancel, isLoading }: RoomFormProps) => {
  const [formData, setFormData] = useState<RoomRequest>({
    roomNumber: '',
    roomType: RoomType.SINGLE,
    capacity: 1,
    rentAmount: 0,
    depositAmount: 0,
    floor: 1,
    status: RoomStatus.AVAILABLE,
    amenities: [],
    description: '',
  });

  const [amenityInput, setAmenityInput] = useState('');

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        roomType: room.roomType,
        capacity: room.capacity,
        rentAmount: room.rentAmount,
        depositAmount: room.depositAmount,
        floor: room.floor,
        status: room.status,
        amenities: room.amenities || [],
        description: room.description || '',
      });
    }
  }, [room]);

  const handleChange = (field: keyof RoomRequest, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const addAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityInput.trim()],
      });
      setAmenityInput('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((a) => a !== amenity),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="roomNumber">Room Number *</Label>
          <Input
            id="roomNumber"
            value={formData.roomNumber}
            onChange={(e) => handleChange('roomNumber', e.target.value)}
            placeholder="101"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="roomType">Room Type *</Label>
          <Select
            value={formData.roomType}
            onValueChange={(value) => handleChange('roomType', value as RoomType)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(RoomType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity *</Label>
          <Input
            id="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={(e) => handleChange('capacity', parseInt(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
        <Label htmlFor="floor">Floor *</Label>
          <Input
            id="floor"
            type="number"
            min="0"
            value={formData.floor}
            onChange={(e) => handleChange('floor', parseInt(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rentAmount">Rent Amount (₹) *</Label>
          <Input
            id="rentAmount"
            type="number"
            min="0"
            value={formData.rentAmount}
            onChange={(e) => handleChange('rentAmount', parseFloat(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="depositAmount">Deposit Amount (₹) *</Label>
          <Input
            id="depositAmount"
            type="number"
            min="0"
            value={formData.depositAmount}
            onChange={(e) => handleChange('depositAmount', parseFloat(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange('status', value as RoomStatus)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(RoomStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amenities">Amenities</Label>
        <div className="flex gap-2">
          <Input
            id="amenities"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            placeholder="e.g., WiFi, AC, Attached Bathroom"
            disabled={isLoading}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
          />
          <Button type="button" onClick={addAmenity} disabled={isLoading}>
            Add
          </Button>
        </div>
        {formData.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary">
                {amenity}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => removeAmenity(amenity)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
      <Label htmlFor="floor">Floor *</Label>
          <Input
            id="floor"
            type="number"
            min="0"
            value={formData.floor}
            onChange={(e) => handleChange('floor', parseInt(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rentAmount">Rent Amount (₹) *</Label>
          <Input
            id="rentAmount"
            type="number"
            min="0"
            value={formData.rentAmount}
            onChange={(e) => handleChange('rentAmount', parseFloat(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="depositAmount">Deposit Amount (₹) *</Label>
          <Input
            id="depositAmount"
            type="number"
            min="0"
            value={formData.depositAmount}
            onChange={(e) => handleChange('depositAmount', parseFloat(e.target.value))}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleChange('status', value as RoomStatus)}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(RoomStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amenities">Amenities</Label>
        <div className="flex gap-2">
          <Input
            id="amenities"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            placeholder="e.g., WiFi, AC, Attached Bathroom"
            disabled={isLoading}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
          />
          <Button type="button" onClick={addAmenity} disabled={isLoading}>
            Add
          </Button>
        </div>
        {formData.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary">
                {amenity}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => removeAmenity(amenity)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Additional details about the room..."
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : room ? 'Update Room' : 'Create Room'}
        </Button>
      </div>
    </form>
  );
};
