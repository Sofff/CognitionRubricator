using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryDBMethods
{
   public class BaseFunctions
   {
      public static string NormalizeWord(string word) //нормализация слова (маскирование)
      {
         word = word.Replace("'", "");
         string NormDelStr_1 = "УуЕеЪъЙйЫыАаОоЭэЯяИиЬьЮюAaEeIiOoUuYy";
         string NormDelStr_2 = "ВвГгМмХхSsDdNnTtRr";
         int i;

         if (word.Length > 3)
            for (i = 0; i <= NormDelStr_1.Length - 1; i++)
               word = word.Substring(0, 3) + word.Substring(3).Replace(NormDelStr_1[i], '$');
         word += '$';
         i = word.Length - 1;
         while ((i >= 3) && (word[i] == '$')) i--;
         if (i >= 3)
         {
            if (((word[i] == 'G') || (word[i] == 'g')) && ((word[i - 1] == 'N') || (word[i - 1] == 'n')) && ((i - 1) >= 3))
            {
               word = word.Insert(i, "$").Remove(i + 1);
               word = word.Insert(i - 1, "$").Remove(i);
            }
            else
               if (NormDelStr_2.IndexOf(word[i]) > -1)
                  word = word.Insert(i, "$").Remove(i + 1);
         }
         while (word.IndexOf("$$") > -1)
            word = word.Replace("$$", "$");
         return word;
      }
   }
}
