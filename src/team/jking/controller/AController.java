package team.jking.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import team.jking.domain.Testtable;
import team.jking.service.AService;


@Controller
@RequestMapping("/test")
public class AController {
	@Autowired
	private AService aService;
	
	@RequestMapping(value="/b")
	public ModelAndView getInfos(){		
		List<Testtable> testtable=aService.getInfos();
		ModelAndView modelAndView=new ModelAndView();
		modelAndView.addObject("list",testtable);	
		modelAndView.setViewName("/List");
		return modelAndView;	
	}

}
