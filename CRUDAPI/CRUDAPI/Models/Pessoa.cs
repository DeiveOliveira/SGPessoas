using System.ComponentModel.DataAnnotations;

namespace CRUDAPI.Models
{
    public class Pessoa
    {
        public int PessoaId { get; set; }
        [Required]
        [StringLength(80)]
        public string? Nome { get; set; }
        [Required]
        [StringLength(80)]
        public string Sobrenome { get; set; }

        public int Idade { get; set; }
        [Required]
        [StringLength(80)]
        public string? Profissao { get; set; }
    }
}
