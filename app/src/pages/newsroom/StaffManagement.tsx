import { useState } from 'react';
import { useNewsroomStore } from '@/store/newsroomStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Mail, 
  UserPlus, 
  MoreHorizontal,
  TrendingUp,
  FileText,
  CheckCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const roleColors: Record<string, string> = {
  JOURNALIST: 'bg-blue-100 text-blue-800',
  EDITOR: 'bg-purple-100 text-purple-800',
  EXECUTIVE_EDITOR: 'bg-orange-100 text-orange-800',
  ADMIN: 'bg-red-100 text-red-800',
  SUPER_ADMIN: 'bg-black text-white',
};

export default function StaffManagement() {
  const { staff } = useNewsroomStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = staff.filter(member => 
    member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold">Staff Management</h1>
          <p className="text-[#6E6A63]">Manage newsroom staff and permissions</p>
        </div>
        <Button className="bg-[#111111] hover:bg-[#C69B2F] hover:text-[#111111]">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[#6E6A63]">Total Staff</p>
            <p className="text-2xl font-bold">{staff.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[#6E6A63]">Journalists</p>
            <p className="text-2xl font-bold">{staff.filter(s => s.role === 'JOURNALIST').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[#6E6A63]">Editors</p>
            <p className="text-2xl font-bold">{staff.filter(s => s.role === 'EDITOR').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[#6E6A63]">Avg Approval Rate</p>
            <p className="text-2xl font-bold">{Math.round(staff.reduce((acc, s) => acc + s.approvalRate, 0) / staff.length)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6E6A63]" />
        <Input
          placeholder="Search staff by name, username, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStaff.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-4 border border-[rgba(17,17,17,0.14)] rounded hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C69B2F] flex items-center justify-center text-[#111111] font-bold text-lg">
                    {member.firstName[0]}{member.lastName[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{member.firstName} {member.lastName}</h3>
                      <Badge className={roleColors[member.role]}>
                        {member.role.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6E6A63]">{member.username} • {member.department}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-[#6E6A63]">
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {member.articlesPublished} published
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {member.approvalRate}% approval
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {member.performance.monthlyViews.toLocaleString()} views/mo
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      <DropdownMenuItem>View Articles</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
