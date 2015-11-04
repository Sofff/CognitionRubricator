using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace LibraryDBMethods
{
   public enum FindType //перечесление типов поиска слова в БД
   {
      None = 0,
      Full = 1, //полное совпадение
      Partial = 2 //частичное свпадение
   }

   [DataContract]
   public class MutualClass //общий класс родитель вида ID,Name
   {
      [DataMember]
      public int ID { get; set; } //ид
      [DataMember]
      public string Name { get; set; } //имя

      public MutualClass(int _id = -1, string _name = "")
      {
         ID = _id;
         Name = _name;
      }
   }

   [DataContract]
   public class RTerm : MutualClass //термин в рубрикаторе
   {
   }

   [DataContract]
   public class GTerm : MutualClass //термин в глоссарии
   {
   }

   [DataContract]
   public class GGlossary : MutualClass //глоссарий
   {
   }

   [DataContract]
   public class GTermGGlossary //тремин-глоссарий
   {
      [DataMember]
      public int ID { get; set; }
      [DataMember]
      public string GTerm { get; set; }
      [DataMember]
      public string GGlossary { get; set; }

      public GTermGGlossary(int _id = -1, string _t = "", string _g = "")
      {
         ID = _id;
         GTerm = _t;
         GGlossary = _g;
      }
   }

   [DataContract]
   public class GTermGGlossaryDescription //описание термина в глоссарии
   {
      [DataMember]
      public int ID { get; set; }
      [DataMember]
      public int ID_GTerm { get; set; }
      [DataMember]
      public int ID_GGlossary { get; set; }
      [DataMember]
      public string Description { get; set; }

      public GTermGGlossaryDescription(int _id = -1, int _idt = -1, int _idg = -1, string _d = "")
      {
         ID = _id;
         ID_GTerm = _idt;
         ID_GGlossary = _idg;
         Description = _d;
      }
   }

   [DataContract]
   public class TTerm : MutualClass //термин в тезаурусе
   {
   }

   [DataContract]
   public class TTehesaurus : MutualClass //тезаурус в группе тезаурус
   {
   }

   [DataContract]
   public class TTermTThesaurus //термин-тезаурус в группе тезаурус
   {
      [DataMember]
      public int ID { get; set; } //ид термин-тезаурус
      [DataMember]
      public int T_ID { get; set; } //ид термина
      [DataMember]
      public string T_Name { get; set; } //имя термина
      [DataMember]
      public int Th_ID { get; set; } //ид тезауруса
      [DataMember]
      public string Th_Name { get; set; } //имя тезауруса

      public TTermTThesaurus(int _id = -1, int _t_id = -1, string _t_n = "", int _th_id = -1, string _th_n = "")
      {
         ID = _id;
         T_ID = _t_id;
         T_Name = _t_n;
         Th_ID = _th_id;
         Th_Name = _th_n;
      }
   }

   [DataContract]
   public class TTermTThesaurusNormal //класс связанных между собой термин-тезаурус объектов
   {
      [DataMember]
      public int ID { get; set; } //ид тремин-тезаурус
      [DataMember]
      public string Name { get; set; } //имя термина в термин-тезаурус
      [DataMember]
      public string Th_Name { get; set; } //имя тезауруса в термин-тезаурус
      [DataMember]
      public int TTRT_ID { get; set; } //ид типа связи
      [DataMember]
      public string TTRT_Name { get; set; } //имя типа связи
      [DataMember]
      public int Level { get; set; } //уровень вложенности
      [DataMember]
      public List<TTermTThesaurusNormal> LT2 { get; set; } //список связанных термин-тезаурус с данным термин-тезаурус

      public TTermTThesaurusNormal(int _id = -1, string _n = "", string _th_n = "", int _ttrt_id = -1, string _ttrt_n = "", int _lv = -1, List<TTermTThesaurusNormal> _lt2 = null)
      {
         ID = _id;
         Name = _n;
         Th_Name = _th_n;
         TTRT_ID = _ttrt_id;
         TTRT_Name = _ttrt_n;
         Level = _lv;
         LT2 = _lt2;
      }
   }







   //[DataContract]
   //public class TTermTThesaurusRelationship 
   //{
   //   [DataMember]
   //   public int ID { get; set; }
   //   [DataMember]
   //   public int TT1_ID { get; set; }
   //   [DataMember]
   //   public int T1_ID { get; set; }
   //   [DataMember]
   //   public string T1_Name { get; set; }
   //   [DataMember]
   //   public int TT2_ID { get; set; }
   //   [DataMember]
   //   public int T2_ID { get; set; }
   //   [DataMember]ы
   //   public string T2_Name { get; set; }
   //   [DataMember]
   //   public int TTRT_ID { get; set; }
   //   [DataMember]
   //   public string TTRT_Name { get; set; }
   //   [DataMember]
   //   public int Level { get; set; }

   //   public TTermTThesaurusRelationship(int _id = -1, int _tt1_id = -1, int _t1_id = -1, string _t1_n = "", int _tt2_id = -1, int _t2_id = -1, string _t2_n = "", int _ttrt_id = -1, string _ttrt_n = "")
   //   {
   //      ID = _id;
   //      TT1_ID = _tt1_id;
   //      T1_ID = _t1_id;
   //      T1_Name = _t1_n;
   //      TT2_ID = _tt2_id;
   //      T2_ID = _t2_id;
   //      T2_Name = _t2_n;
   //      TTRT_ID = _ttrt_id;
   //      TTRT_Name = _ttrt_n;
   //   }
   //}
}
