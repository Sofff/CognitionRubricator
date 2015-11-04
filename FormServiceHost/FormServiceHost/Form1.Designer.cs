namespace FormServiceHost
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
         System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
         this.labelStatus = new System.Windows.Forms.Label();
         this.textBoxLog = new System.Windows.Forms.TextBox();
         this.pictureBoxStatus = new System.Windows.Forms.PictureBox();
         this.buttonRefresh = new System.Windows.Forms.Button();
         this.toolStrip1 = new System.Windows.Forms.ToolStrip();
         this.toolStripDropDownButtonFile = new System.Windows.Forms.ToolStripDropDownButton();
         this.toolStripDropDownButtonData = new System.Windows.Forms.ToolStripDropDownButton();
         this.toolStripMenuItemImport = new System.Windows.Forms.ToolStripMenuItem();
         ((System.ComponentModel.ISupportInitialize)(this.pictureBoxStatus)).BeginInit();
         this.toolStrip1.SuspendLayout();
         this.SuspendLayout();
         // 
         // labelStatus
         // 
         this.labelStatus.AutoSize = true;
         this.labelStatus.Location = new System.Drawing.Point(9, 37);
         this.labelStatus.Name = "labelStatus";
         this.labelStatus.Size = new System.Drawing.Size(37, 13);
         this.labelStatus.TabIndex = 0;
         this.labelStatus.Text = "Status";
         // 
         // textBoxLog
         // 
         this.textBoxLog.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
         this.textBoxLog.Location = new System.Drawing.Point(12, 61);
         this.textBoxLog.Multiline = true;
         this.textBoxLog.Name = "textBoxLog";
         this.textBoxLog.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
         this.textBoxLog.Size = new System.Drawing.Size(777, 344);
         this.textBoxLog.TabIndex = 2;
         // 
         // pictureBoxStatus
         // 
         this.pictureBoxStatus.Image = global::FormServiceHost.Properties.Resources.StatusDisable;
         this.pictureBoxStatus.Location = new System.Drawing.Point(52, 37);
         this.pictureBoxStatus.Name = "pictureBoxStatus";
         this.pictureBoxStatus.Size = new System.Drawing.Size(18, 18);
         this.pictureBoxStatus.SizeMode = System.Windows.Forms.PictureBoxSizeMode.CenterImage;
         this.pictureBoxStatus.TabIndex = 3;
         this.pictureBoxStatus.TabStop = false;
         // 
         // buttonRefresh
         // 
         this.buttonRefresh.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
         this.buttonRefresh.Location = new System.Drawing.Point(679, 32);
         this.buttonRefresh.Name = "buttonRefresh";
         this.buttonRefresh.Size = new System.Drawing.Size(110, 23);
         this.buttonRefresh.TabIndex = 4;
         this.buttonRefresh.Text = "Refresh";
         this.buttonRefresh.UseVisualStyleBackColor = true;
         this.buttonRefresh.Click += new System.EventHandler(this.buttonRefresh_Click);
         // 
         // toolStrip1
         // 
         this.toolStrip1.BackColor = System.Drawing.SystemColors.ControlDark;
         this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripDropDownButtonFile,
            this.toolStripDropDownButtonData});
         this.toolStrip1.Location = new System.Drawing.Point(0, 0);
         this.toolStrip1.Name = "toolStrip1";
         this.toolStrip1.Size = new System.Drawing.Size(801, 25);
         this.toolStrip1.TabIndex = 5;
         this.toolStrip1.Text = "toolStripMain";
         // 
         // toolStripDropDownButtonFile
         // 
         this.toolStripDropDownButtonFile.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Text;
         this.toolStripDropDownButtonFile.ImageTransparentColor = System.Drawing.Color.Magenta;
         this.toolStripDropDownButtonFile.Name = "toolStripDropDownButtonFile";
         this.toolStripDropDownButtonFile.Size = new System.Drawing.Size(38, 22);
         this.toolStripDropDownButtonFile.Text = "File";
         this.toolStripDropDownButtonFile.ToolTipText = "File";
         // 
         // toolStripDropDownButtonData
         // 
         this.toolStripDropDownButtonData.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Text;
         this.toolStripDropDownButtonData.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.toolStripMenuItemImport});
         this.toolStripDropDownButtonData.Image = ((System.Drawing.Image)(resources.GetObject("toolStripDropDownButtonData.Image")));
         this.toolStripDropDownButtonData.ImageTransparentColor = System.Drawing.Color.Magenta;
         this.toolStripDropDownButtonData.Name = "toolStripDropDownButtonData";
         this.toolStripDropDownButtonData.Size = new System.Drawing.Size(44, 22);
         this.toolStripDropDownButtonData.Text = "Data";
         // 
         // toolStripMenuItemImport
         // 
         this.toolStripMenuItemImport.Name = "toolStripMenuItemImport";
         this.toolStripMenuItemImport.Size = new System.Drawing.Size(152, 22);
         this.toolStripMenuItemImport.Text = "Import";
         // 
         // Form1
         // 
         this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
         this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
         this.ClientSize = new System.Drawing.Size(801, 417);
         this.Controls.Add(this.toolStrip1);
         this.Controls.Add(this.buttonRefresh);
         this.Controls.Add(this.pictureBoxStatus);
         this.Controls.Add(this.textBoxLog);
         this.Controls.Add(this.labelStatus);
         this.Name = "Form1";
         this.Text = "Service";
         ((System.ComponentModel.ISupportInitialize)(this.pictureBoxStatus)).EndInit();
         this.toolStrip1.ResumeLayout(false);
         this.toolStrip1.PerformLayout();
         this.ResumeLayout(false);
         this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label labelStatus;
        private System.Windows.Forms.TextBox textBoxLog;
        private System.Windows.Forms.PictureBox pictureBoxStatus;
        private System.Windows.Forms.Button buttonRefresh;
        private System.Windows.Forms.ToolStrip toolStrip1;
        private System.Windows.Forms.ToolStripDropDownButton toolStripDropDownButtonFile;
        private System.Windows.Forms.ToolStripDropDownButton toolStripDropDownButtonData;
        private System.Windows.Forms.ToolStripMenuItem toolStripMenuItemImport;
    }
}

