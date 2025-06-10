using System.Security.Cryptography;
using System.Text;

public class PasswordEncryptExtension
{
    private static readonly string key = "Sp^xQmqfv8K7fGP@6CN@v33@NwKQdQKR";

    public static string Encrypt(string plainText)
    {
        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = Encoding.UTF8.GetBytes(key);
            aesAlg.GenerateIV();
            var iv = aesAlg.IV;

            var encryptor = aesAlg.CreateEncryptor(aesAlg.Key, iv);

            using (var msEncrypt = new MemoryStream())
            {
                msEncrypt.Write(iv, 0, iv.Length);

                using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                using (var swEncrypt = new StreamWriter(csEncrypt))
                {
                    swEncrypt.Write(plainText);
                }

                return Convert.ToBase64String(msEncrypt.ToArray());
            }
        }
    }

    public static string Decrypt(string cipherText)
    {
        var fullCipher = Convert.FromBase64String(cipherText);

        using (Aes aesAlg = Aes.Create())
        {
            aesAlg.Key = Encoding.UTF8.GetBytes(key);
            int ivLength = aesAlg.BlockSize / 8;

            if (fullCipher.Length < ivLength)
                throw new ArgumentException("Некорректная зашифрованная строка");

            byte[] iv = new byte[ivLength];
            Array.Copy(fullCipher, 0, iv, 0, iv.Length);
            aesAlg.IV = iv;

            int cipherStartIndex = ivLength;
            int cipherLength = fullCipher.Length - cipherStartIndex;

            using (var msDecrypt = new MemoryStream(fullCipher, cipherStartIndex, cipherLength))
            using (var csDecrypt = new CryptoStream(msDecrypt, aesAlg.CreateDecryptor(), CryptoStreamMode.Read))
            using (var srDecrypt = new StreamReader(csDecrypt))
            {
                string decryptedText = srDecrypt.ReadToEnd();
                return decryptedText;
            }
        }
    }
}