using gis.Data;
using gis.Repositories;
using Microsoft.EntityFrameworkCore.Storage;

public class UnitOfWork
{
    private readonly AppDbContext _context;

    public AuthRepository AuthRepository { get; }
    public RanhGioiRepository RanhGioiRepository { get; }
    public UserRepository UserRepository { get; }
    public LegendRepository LegendRepository { get; }
    public PipelineRepository PipelineRepository { get; }
    public WaterSupplyStationRepository WaterSupplyStationRepository { get; }
    public DongHoKhachHangRepository DongHoKhachHangRepository { get; }
    public GhiThuTheoKyRepository GhiThuTheoKyRepository { get; }
    public PermissionRepository PermissionRepository { get; }
    public UnitOfWork(
        AppDbContext context,
        AuthRepository authRepository,
        UserRepository userRepository,
        RanhGioiRepository ranhGioiRepository,
        LegendRepository legendRepository,
        PipelineRepository pipelineRepository,
        WaterSupplyStationRepository waterSupplyStationRepository,
        DongHoKhachHangRepository dongHoKhachHangRepository,
        GhiThuTheoKyRepository ghiThuTheoKyRepository,
        PermissionRepository permissionRepository
        )
    {
        _context = context;
        AuthRepository = authRepository;
        UserRepository = userRepository;
        RanhGioiRepository = ranhGioiRepository;
        LegendRepository = legendRepository;
        PipelineRepository = pipelineRepository;
        WaterSupplyStationRepository = waterSupplyStationRepository;
        DongHoKhachHangRepository = dongHoKhachHangRepository;
        GhiThuTheoKyRepository = ghiThuTheoKyRepository;
        PermissionRepository = permissionRepository;
    }

    public Task<int> SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }
   
    public void Dispose()
    {
        _context.Dispose();
    }
    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await _context.Database.BeginTransactionAsync();
    }
}