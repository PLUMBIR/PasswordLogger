namespace PasswordLogBackend.Api.Common.Entities.Note
{
    public class NoteEntity : BaseEntity
    {
        public string Name { get; set; }

        public string Folder { get; set; }

        public string Text { get; set; }

        protected NoteEntity()
        {
        }

        public NoteEntity(string name, string text)
        {
            Name = name;
            Text = text;
        }
    }
}
