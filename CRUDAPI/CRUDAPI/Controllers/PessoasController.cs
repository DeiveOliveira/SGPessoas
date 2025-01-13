using CRUDAPI.Context;
using CRUDAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PessoasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> PegarTodosAsync()
        {
            try
            {
                var pessoa = await _context.Pessoas.AsNoTracking().ToListAsync();

                if (pessoa is null) return NotFound("Pessoas não encontradas.....");

                return pessoa;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ocorreu um problema ao tratar sua solicitação!");
            }
        }

        [HttpGet("{pessoaId:int}")]
        public async Task<ActionResult<Pessoa>> PegarPessoaIDAsync(int pessoaId)
        {
            try
            {
                Pessoa pessoa = await _context.Pessoas.FindAsync(pessoaId);

                if (pessoa is null) return NotFound("Pessoa não encontrada.....");

                return pessoa;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ocorreu um problema ao tratar sua solicitação!");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Pessoa>> SalvarPessoaIDAsync(Pessoa pessoa)
        {
            try
            {
                if (pessoa is null) return BadRequest();

                await _context.Pessoas.AddAsync(pessoa);
                await _context.SaveChangesAsync();

                return Ok(pessoa);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ocorreu um problema ao tratar sua solicitação!");
            }
        }

        [HttpPut]
        public async Task<ActionResult> AtualizarPessoaAsync(Pessoa pessoa)
        {
            try
            {
                if (pessoa == null) return BadRequest("Não pode ser nulo a pessoa...");

                _context.Entry(pessoa).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(pessoa);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ocorreu um problema ao tratar sua solicitação!");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeletaPessoa(int id)
        {
            try
            {
                Pessoa pessoa = await _context.Pessoas.FindAsync(id);

                if (pessoa is null) return NotFound("Pessoa não encontrado....");

                _context.Pessoas.Remove(pessoa);
                await _context.SaveChangesAsync();

                return Ok(pessoa);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Ocorreu um problema ao tratar sua solicitação!");
            }
        }
    }
}