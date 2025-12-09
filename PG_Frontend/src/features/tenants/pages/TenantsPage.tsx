import { useState, useEffect } from 'react';
import { tenantApi } from '../api/tenantApi';
import { Tenant } from '../types/tenant.types';
import { TenantCard } from '../components/TenantCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const TenantsPage = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const loadTenants = async () => {
    try {
      setIsLoading(true);
      const response = await tenantApi.getAllTenants({ search: searchTerm });
      setTenants(response.content);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load tenants', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTenants();
  }, [searchTerm]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await tenantApi.deleteTenant(id);
      toast({ title: 'Success', description: 'Tenant deleted' });
      loadTenants();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tenants</h1>
        <Button><Plus className="mr-2 h-4 w-4" />Add Tenant</Button>
      </div>

      <Input
        placeholder="Search tenants..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onEdit={() => console.log('Edit', tenant)}
              onDelete={handleDelete}
              onViewDetails={() => console.log('View', tenant)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
