﻿using ZOO_Management.DomainModel.Models;

namespace ZOO_Management.DomainServices.Interfaces.Repositories
{
    public interface IZivotinjeRepository
    {
        Task<List<Zivotinja>> GetByNastambaIdAsync(int nastambaId);
        Task<int> UpdateZivotinjaAsync(Zivotinja zivotinja);
        Task<int> DeleteZivotinjaAsync(int id);
        Task<List<Zivotinja>> GetZivotinjeAsync();
        Task<Zivotinja> GetZivotinjaByIdAsync(int id);
        Task<int> CreateZivotinjaAsync(Zivotinja novaZivotinja);
    }
}
