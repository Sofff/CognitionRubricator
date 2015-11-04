using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using LibraryDBMethods.DataSetBaseTableAdapters;
using DS = LibraryDBMethods.DataSetBase;

namespace LibraryDBMethods
{
   public class DBMethods
   {
      //главный датасет, хранит все добавденные данные в него, в таблицах
      private static DS dataSet;

      //адаптер таблицы временных слов, было в самом начале, сейчас не используется
      private static FTemporaryTableWordsTableAdapter fTemporaryTableWordsTableAdapter;

      //адаптеры таблиц группы когнитивный рубрикатор
      private static RDocumentsTableAdapter rDocumentsTableAdapter;
      private static RTermsTableAdapter rTermsTableAdapter;
      private static RRubricsTableAdapter rRubricsTableAdapter;
      private static RRubricsTreePathTableAdapter rRubricsTreePathTableAdapter;
      private static RRubricsRDocumentsTableAdapter rRubricsRDocumentsTableAdapter;
      private static RRubricsRTermsTableAdapter rRubricsRTermsTableAdapter;

      //адаптер таблиц группы тезаурус
      private static TTermsTableAdapter tTermsTableAdapter;
      private static TThesaurusesTableAdapter tThesaurusesTableAdapter;
      private static TTermsTThesaurusesTableAdapter tTermsTThesaurusesTableAdapter;
      private static TTermsTThesaurusRelationshipTypesTableAdapter tTermsTThesaurusRelationshipTypesTableAdapter;
      private static TTermsTThesaurusRelationshipsTableAdapter tTermsTThesaurusRelationshipsTableAdapter;

      //адаптер таблиц группы глоссарий
      private static GTermsTableAdapter gTermsTableAdapter;
      private static GGlossariesTableAdapter gGlossariesTableAdapter;
      private static GTermsGGlossariesTableAdapter gTermsGGlossariesTableAdapter;

      //конструктор
      public DBMethods(string _connectionString)
      {
         Properties.Settings.Default["KnowledgeBaseConnectionString"] = _connectionString;

         dataSet = new DS();

         fTemporaryTableWordsTableAdapter = new FTemporaryTableWordsTableAdapter();

         rDocumentsTableAdapter = new RDocumentsTableAdapter();
         rTermsTableAdapter = new RTermsTableAdapter();
         rRubricsTableAdapter = new RRubricsTableAdapter();
         rRubricsTreePathTableAdapter = new RRubricsTreePathTableAdapter();
         rRubricsRDocumentsTableAdapter = new RRubricsRDocumentsTableAdapter();
         rRubricsRTermsTableAdapter = new RRubricsRTermsTableAdapter();

         tTermsTableAdapter = new TTermsTableAdapter();
         tThesaurusesTableAdapter = new TThesaurusesTableAdapter();
         tTermsTThesaurusesTableAdapter = new TTermsTThesaurusesTableAdapter();
         tTermsTThesaurusRelationshipTypesTableAdapter = new TTermsTThesaurusRelationshipTypesTableAdapter();
         tTermsTThesaurusRelationshipsTableAdapter = new TTermsTThesaurusRelationshipsTableAdapter();

         gTermsTableAdapter = new GTermsTableAdapter();
         gGlossariesTableAdapter = new GGlossariesTableAdapter();
         gTermsGGlossariesTableAdapter = new GTermsGGlossariesTableAdapter();
      }

      //заполнение таблиц в датасете
      public void FillTables()
      {
         fTemporaryTableWordsTableAdapter.Fill(dataSet.FTemporaryTableWords);

         rDocumentsTableAdapter.Fill(dataSet.RDocuments);
         rTermsTableAdapter.Fill(dataSet.RTerms);
         rRubricsTableAdapter.Fill(dataSet.RRubrics);
         rRubricsTreePathTableAdapter.Fill(dataSet.RRubricsTreePath);
         rRubricsRDocumentsTableAdapter.Fill(dataSet.RRubricsRDocuments);
         rRubricsRTermsTableAdapter.Fill(dataSet.RRubricsRTerms);

         tTermsTableAdapter.Fill(dataSet.TTerms);
         tThesaurusesTableAdapter.Fill(dataSet.TThesauruses);
         tTermsTThesaurusesTableAdapter.Fill(dataSet.TTermsTThesauruses);
         tTermsTThesaurusRelationshipTypesTableAdapter.Fill(dataSet.TTermsTThesaurusRelationshipTypes);
         tTermsTThesaurusRelationshipsTableAdapter.Fill(dataSet.TTermsTThesaurusRelationships);

         gTermsTableAdapter.Fill(dataSet.GTerms);
         gGlossariesTableAdapter.Fill(dataSet.GGlossaries);
         gTermsGGlossariesTableAdapter.Fill(dataSet.GTermsGGlossaries);
      }

      //Получение словаря всех слов из таблицы временные слова, использовалось в первой версии
      public Dictionary<string, string> GetAllTemporaryWords()
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DataRow dr in dataSet.FTemporaryTableWords.Rows)
            list.Add(((DS.FTemporaryTableWordsRow)dr).ID.ToString(), ((DS.FTemporaryTableWordsRow)dr).Word);

         return list;
      }

      //получение словаря всех слов из таблицы термины рубрикатора
      public Dictionary<string, string> GetAllTerms()
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.RTermsRow tr in dataSet.RTerms.Rows)
            list.Add(tr.Id.ToString(), tr.Name);

         return list;
      }

      //получение описания слова из таблицы временных слов, использовалось в первой версии
      public string GetTemporaryTableWordDescription(int _id)
      {
         return dataSet.FTemporaryTableWords.FindByID(_id).Description;
      }

      //получение словаря рубрик по ид термина
      public Dictionary<string, string> GetTermIDRubricks(int _tid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.RRubricsRTermsRow rt in dataSet.RRubricsRTerms.Select("RTerm_id = " + _tid))
            if (!list.ContainsKey(rt.RRubric_id.ToString()))
               list.Add(rt.RRubric_id.ToString(), rt.RRubricsRow.Name);
            else
               list.Add("!" + rt.RRubric_id.ToString(), rt.RRubricsRow.Name);

         return list;
      }

      //получение списка рубрик которые являются предками
      public Dictionary<string, string> GetRelatedRubricsParents(int _rid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.RRubricsTreePathRow rtp in dataSet.RRubricsTreePath.Select("RRubric_child_id = " + _rid))
            list.Add(rtp.RRubric_parent_id.ToString(), rtp.RRubricsRowByFK_RRubricsTreePath_RRubrics_Parent.Name);

         return list;
      }

      //получение списка рубрик вляющимися потомками
      public Dictionary<string, string> GetRelatedRubricsChilds(int _rid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.RRubricsTreePathRow rtp in dataSet.RRubricsTreePath.Select("RRubric_parent_id = " + _rid))
            list.Add(rtp.RRubric_child_id.ToString(), rtp.RRubricsRowByFK_RRubricsTreePath_RRubrics_Child.Name);

         return list;
      }

      //дополнительная информация по рубрике
      public Dictionary<string, string> GetAdditionalRubricInfo(int _rid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         list.Add("id", _rid.ToString());
         list.Add("name", dataSet.RRubrics.FindById(_rid).Name);
         list.Add("description", dataSet.RRubrics.FindById(_rid).Description);
         list.Add("sign", dataSet.RRubrics.FindById(_rid).SignSegmenatations);

         DS.RRubricsRDocumentsRow[] rcr = dataSet.RRubrics.FindById(_rid).GetRRubricsRDocumentsRows();
         string dcs = "";
         if (rcr.Length > 0)
            foreach (DS.RRubricsRDocumentsRow rdr in rcr)
               dcs += (dcs.Length > 0 ? ", " : "") + rdr.RDocumentsRow.Name;
         list.Add("docs", dcs);
         DS.RRubricsRTermsRow[] rtr = dataSet.RRubrics.FindById(_rid).GetRRubricsRTermsRows();
         string trms = "";
         if (rtr.Length > 0)
            foreach (DS.RRubricsRTermsRow rrr in rtr)
               trms += (trms.Length > 0 ? ", " : "") + rrr.RTermsRow.Name;
         list.Add("terms", trms);

         return list;
      }

      //изменение описания рубрики
      public bool EditAdditionalRubricInfoDescription(int _rid, string _dta)
      {
         DS.RRubricsRow rr = dataSet.RRubrics.FindById(_rid);
         rr.Description = _dta;
         rRubricsTableAdapter.Update(rr);

         return true;
      }

      //изменение принципа деления рубрики
      public bool EditAdditionalRubricInfoSign(int _rid, string _dta)
      {
         DS.RRubricsRow rr = dataSet.RRubrics.FindById(_rid);
         rr.SignSegmenatations = _dta;
         rRubricsTableAdapter.Update(rr);

         return true;
      }

      //добавление документа к рубрике
      public bool EditAdditionalRubricInfoDocuments(int _rid, string _dta)
      {
         DS.RRubricsRow rr = dataSet.RRubrics.FindById(_rid);
         //DS.DocumentsRow[] drs = dataSet.Documents.Select("Name = " + _dta) as DS.DocumentsRow[];
         //if (drs.Length > 0)
         //{

         //}
         //else
         //{
         DS.RDocumentsRow dr = dataSet.RDocuments.AddRDocumentsRow(_dta, "");
         rDocumentsTableAdapter.Update(dr);
         DS.RRubricsRDocumentsRow rdr = dataSet.RRubricsRDocuments.AddRRubricsRDocumentsRow(rr, dr);
         rRubricsRDocumentsTableAdapter.Update(rdr);
         //}

         return true;
      }

      //добавление термина к рубрике
      public bool EditAdditionalRubricInfoTerms(int _rid, string _dta)
      {
         DS.RRubricsRow rr = dataSet.RRubrics.FindById(_rid);
         DS.RTermsRow[] trs = dataSet.RTerms.Select("[Name] = '" + _dta + "'") as DS.RTermsRow[];
         if (trs.Length > 0)
         {
            DS.RRubricsRTermsRow rtr = dataSet.RRubricsRTerms.AddRRubricsRTermsRow(rr, trs[0]);
            rRubricsRTermsTableAdapter.Update(rtr);
         }
         else
         {
            DS.RTermsRow tr = dataSet.RTerms.AddRTermsRow(_dta);
            rTermsTableAdapter.Update(tr);
            DS.RRubricsRTermsRow rtr = dataSet.RRubricsRTerms.AddRRubricsRTermsRow(rr, tr);
            rRubricsRTermsTableAdapter.Update(rtr);
         }

         return true;
      }



      //поиск терминов в глоссарии (частично или полностью)
      public List<GTermGGlossary> GetGTermGGlossaryByText(string _tn, FindType _ft)
      {
         List<GTermGGlossary> list = new List<GTermGGlossary>();

         string select = "ID < 0";
         switch (_ft)
         {
            case FindType.Full:
               select = String.Format("Name = {0}", _tn);
               break;
            case FindType.Partial:
               select = String.Format("Name LIKE '%{0}%'", _tn);
               break;
         }

         DS.GTermsRow[] trs = dataSet.GTerms.Select(select) as DS.GTermsRow[];
         if (trs.Length > 0)
            foreach (DS.GTermsRow tr in trs)
            {
               DS.GTermsGGlossariesRow[] tgrs = tr.GetGTermsGGlossariesRows();
               foreach (DS.GTermsGGlossariesRow tgr in tgrs)
                  list.Add(new GTermGGlossary(tgr.Id, tgr.GTermsRow.Name, tgr.GGlossariesRow.Name));
            }

         return list;
      }

      //поиск описания термин-глоссария по ИД
      public GTermGGlossaryDescription GetGTermGGlossaryDescriptionByID(int _id)
      {
         DS.GTermsGGlossariesRow tgr = dataSet.GTermsGGlossaries.FindById(_id);
         return new GTermGGlossaryDescription(tgr.Id, tgr.GTerm_ID, tgr.GGlossary_ID, tgr.Description);
      }


      //поиск терминов в группе тезаурус по имени (частично или полностью)
      public List<TTermTThesaurus> GetTTermTThesaurusListByName(string _tn, FindType _ft)
      {
         List<TTermTThesaurus> list = new List<TTermTThesaurus>();

         string select = "ID < 0";
         switch (_ft)
         {
            case FindType.Full:
               select = String.Format("Name = {0}", _tn);
               break;
            case FindType.Partial:
               select = String.Format("Name LIKE '%{0}%'", _tn);
               break;
         }

         DS.TTermsRow[] trs = dataSet.TTerms.Select(select) as DS.TTermsRow[];
         if (trs.Length > 0)
            foreach (DS.TTermsRow tr in trs)
            {
               DS.TTermsTThesaurusesRow[] tthrs = tr.GetTTermsTThesaurusesRows();
               foreach (DS.TTermsTThesaurusesRow tthr in tthrs)
                  list.Add(new TTermTThesaurus(tthr.Id, tthr.TTerm_ID, tthr.TTermsRow.Name, tthr.TThesaurus_ID, tthr.TThesaurusesRow.Name));
            }

         return list;
      }

      //поиск термина в группе тезаурус по ид термина из группы рубрикатор
      public List<TTermTThesaurus> GetTTermTThesaurusListById(int _tid, FindType _ft)
      {
         return GetTTermTThesaurusListByName(dataSet.RTerms.FindById(_tid).Name, _ft);
      }

      //поиск связанных термин-тезаурус с запроенным термин-тезаурус
      public TTermTThesaurusNormal GetTTermTThesaurusNormalById(int _id, int _lv, int _ln)
      {
         int clv = -1;
         List<TTermTThesaurusNormal> lst = new List<TTermTThesaurusNormal>();
         return recursGetTTermTThesaurusNormal(_id, _lv, _ln, ref clv, 0, "", ref lst); ;
      }

      //рекурсивный проход для GetTTermTThesaurusNormalById
      private TTermTThesaurusNormal recursGetTTermTThesaurusNormal(int id, int lv, int ln, ref int clv, int ttrt_id, string ttrt_n, ref List<TTermTThesaurusNormal> lstAll)
      {
         TTermTThesaurusNormal ttn = null;
         ++clv; //текущий уровень вложенности

         if (clv <= lv) //проверка на макс. длинну вложенности
         {
            DS.TTermsTThesaurusesRow ttr = dataSet.TTermsTThesauruses.FindById(id);
            ttn = new TTermTThesaurusNormal(ttr.Id, ttr.TTermsRow.Name, ttr.TThesaurusesRow.Name, ttrt_id, ttrt_n, clv, new List<TTermTThesaurusNormal>());

            if (ttrt_id != 2 && lstAll.Where(item => item.ID == ttn.ID).Count() == 0) //2 - ассоциативно связанному термину, и если не содержится в общем списке
            {
               lstAll.Add(ttn);
               int cln = 0; //текущая длинна цепочки
               DS.TTermsTThesaurusRelationshipsRow[] ttrrs = dataSet.TTermsTThesaurusRelationships.Select(String.Format("TTermsInTThesauruses1_ID = {0}", id)) as DS.TTermsTThesaurusRelationshipsRow[];
               foreach (DS.TTermsTThesaurusRelationshipsRow ttrr in ttrrs)
               {
                  DS.TTermsTThesaurusesRow ttr2 = ttrr.TTermsTThesaurusesRowByFK_TTermsTThesaurusRelationships_TTermsInTThesauruses2;
                  if (ttr2.Id != 0)
                     ttn.LT2.Add(recursGetTTermTThesaurusNormal(ttr2.Id, lv, ln, ref clv, ttrr.TTermsTThesaurusRelationshipType_ID, ttrr.TTermsTThesaurusRelationshipTypesRow.Name, ref lstAll));
                  if (++cln > ln)
                     break;
               }
            }
         }

         --clv;
         return ttn;
      }

      //поиск термина в группе рубрика по имени
      public Dictionary<string, string> GetTermTextRubricks(string _text)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.RTermsRow rr in dataSet.RTerms.Select(String.Format("Name LIKE '%{0}%'", _text)))
            foreach (DS.RRubricsRTermsRow rtr in rr.GetRRubricsRTermsRows())
               if (!list.ContainsKey(rtr.RRubric_id.ToString()))
                  list.Add(rtr.RRubric_id.ToString(), rtr.RRubricsRow.Name);
               else
                  list.Add("!" + rtr.RRubric_id.ToString(), rtr.RRubricsRow.Name);

         return list;
      }

      //поиск термин-тезаурус по имени
      public List<TTermTThesaurus> GetTTermTThesaurusListByText(string _text, FindType _ft)
      {
         return GetTTermTThesaurusListByName( _text, _ft);
      }










      //public List<TTermTThesaurusRelationship> GetTTermTThesaurusRelationshipsList(int _id, int _lvl)
      //{
      //   List<TTermTThesaurusRelationship> list = new List<TTermTThesaurusRelationship>();

      //   if (_lvl > 20 || _lvl < 1)
      //      _lvl = 1;

      //   List<int> idl = new List<int>() { _id };
      //   while (_lvl > 0)
      //   {
      //      foreach (int id in idl)
      //      {
      //         DS.TTermsTThesaurusRelationshipsRow[] ttrrs = dataSet.TTermsTThesaurusRelationships.Select(String.Format("TTermInThesauruses1_ID = {0}", id)) as DS.TTermsTThesaurusRelationshipsRow[];
      //         foreach (DS.TTermsTThesaurusRelationshipsRow ttrr in ttrrs)
      //         {
      //            list.Add(new TTermTThesaurusRelationship(ttrr.Id, ttrr.TTermsInTThesauruses1_ID, ttrr.TTermsTThesaurusesRowByFK_TTermsTThesaurusRelationships_TTermsInTThesauruses1.TTerm_ID,
      //               ttrr.TTermsTThesaurusesRowByFK_TTermsTThesaurusRelationships_TTermsInTThesauruses1.TTermsRow.Name, ttrr.TTermsInTThesauruses2_ID, ttrr.TTermsTThesaurusesRowByFK_TTermsTThesaurusRelationships_TTermsInTThesauruses2.TTerm_ID,
      //               ttrr.TTermsTThesaurusesRowByFK_TTermsTThesaurusRelationships_TTermsInTThesauruses2.TTermsRow.Name, ttrr.TTermsTThesaurusRelationshipType_ID,
      //               ttrr.TTermsTThesaurusRelationshipTypesRow.Name));
      //         }
      //      }

      //      _lvl--;
      //   }


      //   return list;
      //}
   }
}
