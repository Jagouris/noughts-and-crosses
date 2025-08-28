using System.Data;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public char Winner { get; set; }

        public bool IsComplete { get; set; }

        public long Date { get; set; }
    }

}
