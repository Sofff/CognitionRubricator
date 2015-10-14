using ClassLibraryDBMethods.DataSetBaseTableAdapters;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DS = ClassLibraryDBMethods.DataSetBase;

namespace ClassLibraryDBMethods
{
   public class DBMethods
   {
      private static DS dataSet;// = new DS();
      private static TemporaryTableWordsTableAdapter temporaryTableWordsTableAdapter;// = new TemporaryTableWordsTableAdapter();
      private static RubricsTableAdapter rubricsTableAdapter;
      private static RubricsTreePathTableAdapter rubricsTreePathTableAdapter;
      private static RubricsDocumentsTableAdapter rubricsDocumentsTableAdapter;
      private static RubricsTermsTableAdapter rubricsTermsTableAdapter;
      private static DocumentsTableAdapter documentsTableAdapter;
      private static TermsTableAdapter termsTableAdapter;

      public DBMethods()
      {
         dataSet = new DS();
         temporaryTableWordsTableAdapter = new TemporaryTableWordsTableAdapter();
         rubricsTableAdapter = new RubricsTableAdapter();
         rubricsTreePathTableAdapter = new RubricsTreePathTableAdapter();
         rubricsDocumentsTableAdapter = new RubricsDocumentsTableAdapter();
         rubricsTermsTableAdapter = new RubricsTermsTableAdapter();
         documentsTableAdapter = new DocumentsTableAdapter();
         termsTableAdapter = new TermsTableAdapter();
      }

      public void FillTemporaryTableWords()
      {
         temporaryTableWordsTableAdapter.Fill(dataSet.TemporaryTableWords);
         rubricsTableAdapter.Fill(dataSet.Rubrics);
         rubricsTreePathTableAdapter.Fill(dataSet.RubricsTreePath);
         rubricsDocumentsTableAdapter.Fill(dataSet.RubricsDocuments);
         rubricsTermsTableAdapter.Fill(dataSet.RubricsTerms);
         documentsTableAdapter.Fill(dataSet.Documents);
         termsTableAdapter.Fill(dataSet.Terms);
      }

      public Dictionary<string, string> GetAllTemporaryWords()
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DataRow dr in dataSet.TemporaryTableWords.Rows)
            list.Add(((DS.TemporaryTableWordsRow)dr).ID.ToString(), ((DS.TemporaryTableWordsRow)dr).Word);

         return list;
      }

      public Dictionary<string, string> GetAllTerms()
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.TermsRow tr in dataSet.Terms.Rows)
            list.Add(tr.id.ToString(), tr.Name);

         return list;
      }

      public string GetTemporaryTableWordDescription(int _id)
      {
         return dataSet.TemporaryTableWords.FindByID(_id).Description;
      }

      public Dictionary<string, string> GetDocuments(int _rid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.DocumentsRow dr in dataSet.Documents.Select("Rubric_id = " + _rid))
            list.Add(dr.id.ToString(), dr.Name);

         return list;
      }

      public Dictionary<string, string> GetTerms(int _rid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.TermsRow tr in dataSet.Terms.Select("Rubric_id = " + _rid))
            list.Add(tr.id.ToString(), tr.Name);

         return list;
      }

      public Dictionary<string, string> GetTermIDRubricks(int _tid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.RubricsTermsRow rt in dataSet.RubricsTerms.Select("Term_id = " + _tid))
            if (!list.ContainsKey(rt.Rubric_id.ToString()))
               list.Add(rt.Rubric_id.ToString(), rt.RubricsRow.Name);
            else
               list.Add("!" + rt.Rubric_id.ToString(), rt.RubricsRow.Name);

         return list;
      }

      public Dictionary<string, string> GetRelatedRubricsParents(int _rid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.RubricsTreePathRow rtp in dataSet.RubricsTreePath.Select("Rubric_child_id = " + _rid))
            list.Add(rtp.Rubric_parent_id.ToString(), rtp.RubricsRowByFK_RubricsTreePath_Rubrics_Parent.Name);

         return list;
      }

      public Dictionary<string, string> GetRelatedRubricsChilds(int _rid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         foreach (DS.RubricsTreePathRow rtp in dataSet.RubricsTreePath.Select("Rubric_parent_id = " + _rid))
            list.Add(rtp.Rubric_child_id.ToString(), rtp.RubricsRowByFK_RubricsTreePath_Rubrics_Child.Name);

         return list;
      }

      public Dictionary<string, string> GetAdditionalRubricInfo(int _rid)
      {
         Dictionary<string, string> list = new Dictionary<string, string>();

         list.Add("id", _rid.ToString());
         list.Add("name", dataSet.Rubrics.FindByid(_rid).Name);
         list.Add("description", dataSet.Rubrics.FindByid(_rid).Description);
         list.Add("sign", dataSet.Rubrics.FindByid(_rid).SignSegmenatations);

         DS.RubricsDocumentsRow[] rcr = dataSet.Rubrics.FindByid(_rid).GetRubricsDocumentsRows();
         string dcs = "";
         if (rcr.Length > 0)
            foreach (DS.RubricsDocumentsRow rdr in rcr)
               dcs += (dcs.Length > 0 ? ", " : "") + rdr.DocumentsRow.Name;
         list.Add("docs", dcs);
         DS.RubricsTermsRow[] rtr = dataSet.Rubrics.FindByid(_rid).GetRubricsTermsRows();
         string trms = "";
         if (rtr.Length > 0)
            foreach (DS.RubricsTermsRow rrr in rtr)
               trms += (trms.Length > 0 ? ", " : "") + rrr.TermsRow.Name;
         list.Add("terms", trms);

         return list;
      }

      public bool EditAdditionalRubricInfoDescription(int _rid, string _dta)
      {
         DS.RubricsRow rr = dataSet.Rubrics.FindByid(_rid);
         rr.Description = _dta;
         rubricsTableAdapter.Update(rr);

         return true;
      }

      public bool EditAdditionalRubricInfoSign(int _rid, string _dta)
      {
         DS.RubricsRow rr = dataSet.Rubrics.FindByid(_rid);
         rr.SignSegmenatations = _dta;
         rubricsTableAdapter.Update(rr);

         return true;
      }

      public bool EditAdditionalRubricInfoDocuments(int _rid, string _dta)
      {
         DS.RubricsRow rr = dataSet.Rubrics.FindByid(_rid);
         //DS.DocumentsRow[] drs = dataSet.Documents.Select("Name = " + _dta) as DS.DocumentsRow[];
         //if (drs.Length > 0)
         //{

         //}
         //else
         //{
         DS.DocumentsRow dr = dataSet.Documents.AddDocumentsRow(_dta);
         documentsTableAdapter.Update(dr);
         DS.RubricsDocumentsRow rdr = dataSet.RubricsDocuments.AddRubricsDocumentsRow(rr,dr);
         rubricsDocumentsTableAdapter.Update(rdr);
         //}
         
         return true;
      }

      public bool EditAdditionalRubricInfoTerms(int _rid, string _dta)
      {
         DS.RubricsRow rr = dataSet.Rubrics.FindByid(_rid);
         DS.TermsRow[] trs = dataSet.Terms.Select("[Name] = '" + _dta + "'") as DS.TermsRow[];
         if (trs.Length > 0)
         {
            DS.RubricsTermsRow rtr = dataSet.RubricsTerms.AddRubricsTermsRow(rr, trs[0]);
            rubricsTermsTableAdapter.Update(rtr);
         }
         else
         {
            DS.TermsRow tr = dataSet.Terms.AddTermsRow(_dta);
            termsTableAdapter.Update(tr);
            DS.RubricsTermsRow rtr = dataSet.RubricsTerms.AddRubricsTermsRow(rr, tr);
            rubricsTermsTableAdapter.Update(rtr);
         }

         return true;
      }
   }
}
