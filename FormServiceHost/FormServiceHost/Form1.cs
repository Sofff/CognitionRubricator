using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.Configuration;
using System.Threading;
using WcfServiceLibrary;

namespace FormServiceHost
{
   public partial class Form1 : Form
   {
      private Thread serviceThread;
      private ServiceHost host;
      private EventWaitHandle ewh;

      public Form1()
      {
         InitializeComponent();

         try
         {
            FormClosing += Form1_FormClosing;
            textBoxLog.TextChanged += textBoxLog_TextChanged;

            serviceThread = new Thread(ThreadRunningService);
            serviceThread.Start();
         }
         catch (Exception ex)
         {
            SetTextTextBoxLog(ex.ToString());
         }
      }

      private void ThreadRunningService()
      {
         try
         {
            ewh = new EventWaitHandle(false, EventResetMode.ManualReset);

            SetTextTextBoxLog("Service initializing.");
            ServiceBase.Initialize(SetTextTextBoxLog, new Properties.Settings().KnowledgeBaseConnectionString);

            //Uri baseAddress = new Uri(ConfigurationManager.AppSettings["httpBaseAddress"]);
            //Uri baseAddress = new Uri(Properties.Settings.Default.httpBaseAddress);
            //BasicHttpBinding binding = new BasicHttpBinding("webBasicHttpBindingBase");   
            //ServiceMetadataBehavior serviceBehavior = new ServiceMetadataBehavior();
            //serviceBehavior.HttpGetEnabled = true;
            //WebHttpBinding webBinding = new WebHttpBinding();
            //WebHttpBehavior httpBehavior = new WebHttpBehavior();
            host = new ServiceHost(typeof(ServiceBase));
            foreach (ServiceEndpoint se in host.Description.Endpoints)
               SetTextTextBoxLog("Address: " + se.ListenUri.AbsoluteUri);
            //ServiceBase.FillTable();
            //host.AddServiceEndpoint(typeof(IServiceBase), binding, baseAddress);
            //SetTextTextBoxLog("Address: " + baseAddress.AbsoluteUri);
            //host.AddServiceEndpoint(typeof(IServiceBase), binding, "");
            //host.Description.Behaviors.Add(serviceBehavior);

            host.Open();
            SetTextTextBoxLog("Service started.");
            pictureBoxStatus.Image = Properties.Resources.StatusEnable;

            ewh.WaitOne();
            host.Close();
            SetTextTextBoxLog("Service stoped.");
         }
         catch (Exception ex)
         {
            SetTextTextBoxLog(ex.ToString());
         }
         finally
         {
            pictureBoxStatus.Image = Properties.Resources.StatusDisable;
         }
      }

      void Form1_FormClosing(object sender, FormClosingEventArgs e)
      {
         ewh.Set();
      }

      void textBoxLog_TextChanged(object sender, EventArgs e)
      {
         try
         {
            TextBox tb = sender as TextBox;
            tb.SelectionStart = tb.TextLength;
            tb.ScrollToCaret();
         }
         catch { }
      }

      private void SetTextTextBoxLog(string text)
      {
         if (textBoxLog.InvokeRequired)
            textBoxLog.Invoke(new Action<string>(SetTextTextBoxLog), new object[] { text });
         else
            textBoxLog.Text += DateTime.Now.ToString("dd.MM.yy HH:MM:ss - ") + text + "\r\n";
      }

      private void buttonRefresh_Click(object sender, EventArgs e)
      {
         try
         {
            ServiceBase.FillTable();
            if (!serviceThread.IsAlive)
               serviceThread.Start();
         }
         catch (Exception ex)
         {
            SetTextTextBoxLog(ex.ToString());
         }
      }

   }
}
