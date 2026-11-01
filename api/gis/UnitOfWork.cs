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
    public UnitOfWork(
        AppDbContext context,
        AuthRepository authRepository,
        UserRepository userRepository,
        RanhGioiRepository ranhGioiRepository,
        LegendRepository legendRepository
        )
    {
        _context = context;
        AuthRepository = authRepository;
        UserRepository = userRepository;
        RanhGioiRepository = ranhGioiRepository;
        LegendRepository = legendRepository;
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