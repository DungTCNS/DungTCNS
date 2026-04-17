import React, { useState, useMemo } from 'react';
import { Search, User, Briefcase, Mail, Phone, MapPin, Calendar, CreditCard, GraduationCap, Building, FileText, CheckCircle, Clock, Users } from 'lucide-react';
import { mockEmployees } from './data/mockData';
import { Employee } from './types';

const getAvatarUrl = (url: string) => {
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${url.slice(1)}`;
  }
  return url;
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(mockEmployees[0].id);

  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter(emp => 
      emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const selectedEmployee = useMemo(() => {
    return mockEmployees.find(emp => emp.id === selectedEmployeeId) || null;
  }, [selectedEmployeeId]);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-col items-center mb-5 mt-2">
            <img 
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-EVN-V.png" 
              alt="EVN Logo" 
              className="w-14 h-14 object-contain mb-2"
            />
            <div className="text-center">
              <h1 className="text-xl font-black tracking-tight flex items-center justify-center gap-0.5">
                <span className="text-[#103A71]">EVN</span>
                <span className="text-[#E31837]">HCMC</span>
              </h1>
              <h2 className="text-[10px] font-bold text-[#103A71] uppercase mt-1 tracking-wide">
                Tổng công ty Điện lực TP.HCM
              </h2>
              <h3 className="text-[9px] font-bold text-[#103A71] uppercase mt-0.5 tracking-wide">
                Công ty Điện lực Vũng Tàu
              </h3>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, mã NV, phòng ban..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent rounded-lg text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(emp => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployeeId(emp.id)}
                className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all duration-200 relative overflow-hidden ${
                  selectedEmployeeId === emp.id 
                    ? 'bg-blue-50/80 shadow-sm ring-1 ring-blue-100' 
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                {selectedEmployeeId === emp.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                )}
                <img 
                  src={getAvatarUrl(emp.avatarUrl)} 
                  alt={emp.fullName} 
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate ${selectedEmployeeId === emp.id ? 'text-blue-700' : 'text-gray-900'}`}>
                    {emp.fullName}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">{emp.position}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">
                      {emp.id}
                    </span>

                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <User className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Không tìm thấy nhân viên nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50/50">
        {selectedEmployee ? (
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="h-32 bg-gradient-to-r from-[#103A71] to-[#1E5CAF]"></div>
              <div className="px-6 sm:px-8 pb-6 relative">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-end mb-2">
                  <div className="-mt-12 sm:-mt-16 shrink-0 relative z-10">
                    <img 
                      src={getAvatarUrl(selectedEmployee.avatarUrl)} 
                      alt={selectedEmployee.fullName} 
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border-4 border-white shadow-md bg-white"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 pt-2 sm:pt-0 sm:pb-2">
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                          {selectedEmployee.fullName}
                        </h1>
                        <div className="text-base text-gray-600 font-medium mt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-400" />{selectedEmployee.position}</span>
                          <span className="hidden sm:inline text-gray-300">•</span>
                          <span className="flex items-center gap-1.5"><Building className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-400" />{selectedEmployee.department}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start xl:items-end shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-50 text-[#103A71] border border-blue-100 shadow-sm">
                          Mã NV: {selectedEmployee.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Thông tin cá nhân */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 xl:col-span-1">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  Thông tin cá nhân
                </h2>
                <div className="flex flex-col gap-1">
                  <InfoRow icon={<Calendar />} label="Ngày sinh" value={selectedEmployee.dateOfBirth} />
                  <InfoRow icon={<User />} label="Giới tính" value={selectedEmployee.gender} />
                  <InfoRow icon={<User />} label="Tuổi" value={String(selectedEmployee.age)} />
                  <InfoRow icon={<MapPin />} label="Quê quán" value={selectedEmployee.hometown} />
                  <InfoRow icon={<Phone />} label="Số điện thoại" value={selectedEmployee.phone || 'Chưa cập nhật'} />
                  <InfoRow icon={<Mail />} label="Email" value={selectedEmployee.email || 'Chưa cập nhật'} />
                </div>
              </div>

              {/* Thông tin công việc & Học vấn */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 xl:col-span-2">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <Building className="w-5 h-5 text-blue-600" />
                  Thông tin công việc & Học vấn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div className="flex flex-col gap-1">
                    <InfoRow icon={<Briefcase />} label="Phòng ban" value={selectedEmployee.department} />
                    <InfoRow icon={<Calendar />} label="Ngày vào ngành điện" value={selectedEmployee.joinDate} />
                    <InfoRow icon={<Clock />} label="Năm công tác" value={String(selectedEmployee.yearsOfService)} />
                    <InfoRow icon={<CreditCard />} label="Bậc lương" value={selectedEmployee.salaryLevel || 'Chưa cập nhật'} />
                    <InfoRow icon={<Calendar />} label="Ngày vào Đảng" value={selectedEmployee.partyJoinDate || 'Chưa cập nhật'} />
                    <InfoRow icon={<FileText />} label="Trình độ chính trị" value={selectedEmployee.politicalTheory || 'Chưa cập nhật'} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <InfoRow icon={<GraduationCap />} label="Trình độ hiện tại" value={selectedEmployee.education || 'Chưa cập nhật'} />
                    <InfoRow icon={<FileText />} label="Ngành đào tạo" value={selectedEmployee.major || 'Chưa cập nhật'} />
                    <InfoRow icon={<Building />} label="Trường cấp bằng" value={selectedEmployee.university || 'Chưa cập nhật'} />
                    <InfoRow icon={<Calendar />} label="Năm tốt nghiệp" value={String(selectedEmployee.graduationYear) || 'Chưa cập nhật'} />
                    <InfoRow icon={<FileText />} label="Loại hình đào tạo" value={selectedEmployee.educationType || 'Chưa cập nhật'} />
                    <InfoRow icon={<GraduationCap />} label="Trình độ khi vào ngành" value={selectedEmployee.entryEducation || 'Chưa cập nhật'} />
                    <InfoRow icon={<FileText />} label="Trình độ ngoại ngữ" value={selectedEmployee.foreignLanguage || 'Chưa cập nhật'} />
                  </div>
                </div>
              </div>

              {/* Quá trình công tác */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 xl:col-span-3">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Quá trình công tác
                </h2>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 whitespace-pre-wrap text-sm text-gray-700">
                  {selectedEmployee.workHistory || 'Chưa cập nhật'}
                </div>
                
                {selectedEmployee.discipline && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-red-600 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Kỷ luật
                    </h3>
                    <div className="bg-red-50 rounded-xl p-4 border border-red-100 whitespace-pre-wrap text-sm text-red-700">
                      {selectedEmployee.discipline}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900">Chưa chọn nhân viên</p>
              <p className="text-sm mt-1">Vui lòng chọn một nhân viên từ danh sách để xem chi tiết</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
      <div className="mt-0.5 p-2 bg-blue-50/50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors [&>svg]:w-4 [&>svg]:h-4">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

